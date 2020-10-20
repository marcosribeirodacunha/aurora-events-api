import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import Event from '../models/Event';

class PhotoEventController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const organizer_id = req.user.id;
    const photoFilename = req.file.filename;

    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne(id, {
      where: { organizer_id },
    });

    if (!event)
      throw new AppError(
        'Event not found or you are not the organizer of the event',
        404
      );

    const photoFilePath = path.join(uploadConfig.directory, event.photo);
    await fs.promises.unlink(photoFilePath);

    event.photo = photoFilename;
    await eventRepository.save(event);

    return res.status(200).json({
      photo: `${req.protocol}://${req.headers.host}/files/${event.photo}`,
    });
  }
}

export default new PhotoEventController();
