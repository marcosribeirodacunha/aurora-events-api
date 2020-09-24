import { Router } from 'express';
import multer from 'multer';
import eventController from '../app/controllers/EventController';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', eventController.index);
router.get('/:id', eventController.show);

router.use(ensureAuthenticated);

router.post('/', upload.single('photo'), eventController.store);
router.delete('/:id', eventController.delete);

export default router;
