import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import User from '../models/User';
import uploadConfig from '../../config/upload';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new AppError('User not found', 404);

    return res.status(200).json(user);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const userRepository = getRepository(User);
    const userAlreadyExists = await userRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) throw new AppError('User already exists');

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;
    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    await userRepository.delete(id);

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      await fs.promises.unlink(avatarFilePath);
    }

    return res.status(204).send();
  }
}

export default new UserController();
