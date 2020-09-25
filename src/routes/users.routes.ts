import { Router } from 'express';
import multer from 'multer';
import userController from '../app/controllers/UserController';
import avatarController from '../app/controllers/AvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.delete('/:id', userController.delete);
router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update
);

export default router;
