import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import Event from '../models/Event';
import uploadConfig from '../../config/upload';

class EventController {
  public async index(req: Request, res: Response): Promise<Response> {
    const eventRepository = getRepository(Event);
    const events = await eventRepository.find({
      order: { created_at: 'DESC', title: 'DESC' },
    });
    return res.status(200).json(events);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(id);

    if (!event) throw new AppError('Event not found', 404);

    return res.status(200).json(event);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { title, description, location } = req.body;
    const photo = req.file.filename;

    const eventRepository = getRepository(Event);
    const event = eventRepository.create({
      organizer_id: id,
      title,
      description,
      location,
      photo,
    });

    await eventRepository.save(event);
    return res.status(201).json(event);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const organizer_id = req.user.id;

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(id, {
      where: { organizer_id },
    });

    if (!event) throw new AppError('Event not found', 404);

    await eventRepository.delete(id);
    const photoFilePath = path.join(uploadConfig.directory, event.photo);
    await fs.promises.unlink(photoFilePath);

    return res.status(204).send();
  }
}

export default new EventController();
