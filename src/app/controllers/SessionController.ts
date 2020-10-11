import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import User from '../models/User';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository
      .createQueryBuilder('users')
      .select('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();

    if (!user) throw new AppError('Invalid email/password', 401);

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) throw new AppError('Invalid email/password', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    user.avatar = `${req.protocol}://${req.headers.host}/files/${user.avatar}`;

    delete user.password;
    return res.status(200).json({ user, token });
  }
}

export default new SessionController();
