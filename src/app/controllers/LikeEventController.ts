import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Event from '../models/Event';
import LikeEvent from '../models/LikeEvent';

class LikeEventController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { is_like } = req.body;
    const { event_id } = req.params;
    const user_id = req.user.id;

    const likesRepository = getRepository(LikeEvent);
    const likeEvent = await likesRepository.findOne({
      where: { event_id, user_id },
    });

    // Maybe I should return a better message
    if (likeEvent)
      throw new AppError(
        'Like/Dislike already created. To toggle it, try to update',
        400
      );

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(event_id);

    if (!event) throw new AppError('Event not found', 404);

    if (event.organizer_id === user_id)
      throw new AppError(
        'The event organizers cannot like/dislike their own events',
        400
      );

    const like = likesRepository.create({
      user_id,
      event_id,
      is_like,
    });

    await likesRepository.save(like);

    return res.status(201).json(like);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { is_like } = req.body;
    const { event_id } = req.params;
    const user_id = req.user.id;

    const likesRepository = getRepository(LikeEvent);
    const likeEvent = await likesRepository.findOne({
      where: { event_id, user_id },
    });

    if (!likeEvent) throw new AppError('Like/Dislike not found', 404);

    // Maybe I should return some message
    if (likeEvent.is_like === is_like)
      throw new AppError(
        'Invalid action. Trying to set like/dislike as the same as saved',
        400
      );

    likeEvent.is_like = is_like;
    await likesRepository.save(likeEvent);

    return res.status(200).json(likeEvent);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { event_id } = req.params;

    const likesRepository = getRepository(LikeEvent);
    const likeEvent = await likesRepository.findOne({
      where: { user_id, event_id },
    });

    if (!likeEvent) throw new AppError('Like/Dislike not found', 404);

    await likesRepository.delete({ event_id, user_id });

    return res.status(204).send();
  }
}

export default new LikeEventController();
