import { Router } from 'express';
import userController from '../app/controllers/UserController';

const router = Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.delete('/:id', userController.delete);

export default router;
