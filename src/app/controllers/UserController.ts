import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import User from '../models/User';
import uploadConfig from '../../config/upload';
import Event from '../models/Event';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    const serializedUsers = users.map(user => ({
      ...user,
      avatar: `${req.protocol}://${req.headers.host}/files/${user.avatar}`,
    }));

    return res.status(200).json(serializedUsers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const eventRepository = getRepository(Event);

    const user = await userRepository
      .createQueryBuilder('user')
      .leftJoin('user.likes', 'like')
      .select('user')
      .addSelect(
        'COALESCE(SUM(CASE WHEN like.is_like = true THEN 1 END), 0)',
        'my_likes_count'
      )
      .addSelect(
        'COALESCE(SUM(CASE WHEN like.is_like = false THEN 1 END), 0)',
        'my_dislikes_count'
      )
      .groupBy('user.id')
      .where('user.id = :id', { id })
      .getRawOne();

    const events = await eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.likes', 'like')
      .select('COUNT(event)', 'event_count')
      .addSelect(
        'COALESCE(SUM(CASE WHEN like.is_like = true THEN 1 END), 0)',
        'likes_received_count'
      )
      .addSelect(
        'COALESCE(SUM(CASE WHEN like.is_like = false THEN 1 END), 0)',
        'dislikes_received_count'
      )
      .where('event.organizer_id = :id', { id })
      .getRawOne();

    if (!user) throw new AppError('User not found', 404);

    user.user_avatar = `${req.protocol}://${req.headers.host}/files/${user.user_avatar}`;
    return res.status(200).json({ ...user, ...events });
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
      avatar: 'default-avatar.png',
    });

    await userRepository.save(user);
    return res.status(201).json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    await userRepository.delete(id);

    if (user.avatar !== 'default-avatar.png') {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      await fs.promises.unlink(avatarFilePath);
    }

    return res.status(204).send();
  }
}

export default new UserController();
