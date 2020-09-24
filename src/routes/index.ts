import { Router } from 'express';
import usersRouter from './users.routes';
import eventsRouter from './events.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/events', eventsRouter);

export default router;
