import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  deleteArticle,
  getAllArticles,
  insertArticle,
  updateArticle,
} from '../controllers/articleController.js';
import { body } from 'express-validator';
import multer from 'multer';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 },
});

router.get('/', getAllArticles);

router.use(authToken);

router.post(
  '/',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('content').isLength({ min: 1, max: 255 }),
  ],
  upload.single('image'),
  insertArticle
);
router.put(
  '/:article_id',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('content').isLength({ min: 1, max: 255 }),
  ],
  updateArticle
);

router.delete('/:article_id', deleteArticle);

export default router;
