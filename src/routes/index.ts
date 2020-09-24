import { Router } from 'express';
import usersRouter from './users.routes';
import eventsRouter from './events.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/sessions', sessionsRouter);

export default router;
