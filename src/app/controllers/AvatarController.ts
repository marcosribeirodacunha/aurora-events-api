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

    if (user.avatar !== 'default-avatar.png') {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);

    return res
      .status(200)
      .json({ avatar: `${process.env.APP_URL}/files/${user.avatar}` });
  }
}

export default new AvatarController();
