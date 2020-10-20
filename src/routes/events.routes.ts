import { Router } from 'express';
import multer from 'multer';
import eventController from '../app/controllers/EventController';
import likeEventController from '../app/controllers/LikeEventController';
import photoEventController from '../app/controllers/PhotoEventController';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', eventController.index);
router.get('/:id', eventController.show);

router.use(ensureAuthenticated);

router.post('/', upload.single('photo'), eventController.store);
router.delete('/:id', eventController.delete);
router.patch('/:id', eventController.update);
router.patch('/photo/:id', upload.single('photo'), photoEventController.update);

router.post('/like/:event_id', likeEventController.store);
router.patch('/like/:event_id', likeEventController.update);
router.delete('/like/:event_id', likeEventController.delete);

export default router;
