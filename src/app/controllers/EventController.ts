import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Events from '../models/Events';

class EventController {
  public async index(req: Request, res: Response): Promise<Response> {
    const eventRepository = getRepository(Events);
    const events = await eventRepository.find();
    return res.status(200).json(events);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const eventRepository = getRepository(Events);
    const event = await eventRepository.findOne(id);

    if (!event) throw new AppError('Event not found', 404);

    return res.status(200).json(event);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { organizer_id, title, description, location } = req.body;
    const photo = req.file.filename;

    const eventRepository = getRepository(Events);
    const event = eventRepository.create({
      organizer_id,
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

    const eventRepository = getRepository(Events);
    await eventRepository.delete(id);
    res.status(204).send();
  }
}

export default new EventController();
