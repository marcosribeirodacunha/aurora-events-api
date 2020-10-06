import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import User from '../models/User';
import uploadConfig from '../../config/upload';

class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change the avatar', 401);

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, avatarFilename);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      if (avatarFileExists) await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);

    delete user.password;
    return res.status(200).json(user);
  }
}

export default new AvatarController();