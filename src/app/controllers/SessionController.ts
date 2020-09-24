import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import Users from '../models/Users';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Invalid email/password', 401);

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) throw new AppError('Invalid email/password', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    delete user.password;
    return res.status(200).json({ user, token });
  }
}

export default new SessionController();
