import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Users from '../models/Users';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(Users);
    const users = await userRepository.find();
    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new AppError('User not found', 404);

    return res.status(200).json(user);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const userRepository = getRepository(Users);
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

    const userRepository = getRepository(Users);
    await userRepository.delete(id);
    return res.status(204).send();
  }
}

export default new UserController();
