import { Request, Response } from 'express';
import { FindManyOptions, getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import Event from '../models/Event';
import uploadConfig from '../../config/upload';

class EventController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { organizer } = req.query;

    const options: FindManyOptions<Event> = {
      order: { created_at: 'DESC', title: 'DESC' },
      relations: ['organizer', 'likes'],
    };

    if (organizer) options.where = { organizer_id: organizer };

    const eventRepository = getRepository(Event);
    const events = await eventRepository.find(options);

    const serializedEvents = events.map(event => {
      const serialized = {
        ...event,
        organizer_name: event.organizer?.name,
        photo: `${process.env.APP_URL}/files/${event.photo}`,
        likes: {
          total: event.likes.filter(like => like.is_like).length,
          users: event.likes
            .filter(like => like.is_like)
            .map(like => like.user_id),
        },
        dislikes: {
          total: event.likes.filter(like => !like.is_like).length,
          users: event.likes
            .filter(like => !like.is_like)
            .map(like => like.user_id),
        },
      };
      delete serialized.organizer;
      return serialized;
    });

    return res.status(200).json(serializedEvents);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(id, {
      relations: ['organizer', 'likes'],
    });

    if (!event) throw new AppError('Event not found', 404);

    const serializedEvents = {
      ...event,
      organizer_name: event.organizer?.name,
      organizer_avatar: `${process.env.APP_URL}/files/${
        event.organizer?.avatar || 'default-avatar.png'
      }`,
      photo: `${process.env.APP_URL}/files/${event.photo}`,
      likes: {
        total: event.likes.filter(like => like.is_like).length,
        users: event.likes
          .filter(like => like.is_like)
          .map(like => like.user_id),
      },
      dislikes: {
        total: event.likes.filter(like => !like.is_like).length,
        users: event.likes
          .filter(like => !like.is_like)
          .map(like => like.user_id),
      },
    };

    delete serializedEvents.organizer;
    return res.status(200).json(serializedEvents);
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

    if (!event)
      throw new AppError(
        'Event not found or you are not the organizer of the event.',
        404
      );

    await eventRepository.delete(id);
    const photoFilePath = path.join(uploadConfig.directory, event.photo);
    await fs.promises.unlink(photoFilePath);

    return res.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const organizer_id = req.user.id;
    const { title, description, location } = req.body;

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(id, {
      where: { organizer_id },
    });

    if (!event)
      throw new AppError(
        'Event not found or you are not the organizer of the event.',
        404
      );

    await eventRepository.update(id, {
      title,
      description,
      location,
    });

    return res.status(204).send();
  }
}

export default new EventController();
