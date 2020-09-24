import { Router } from 'express';
import sessionController from '../app/controllers/SessionController';

const router = Router();

router.post('/', sessionController.store);

export default router;
