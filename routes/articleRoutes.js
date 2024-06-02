import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllArticles,
  insertArticle,
  updateArticle,
} from '../controllers/articleController.js';
import { body } from 'express-validator';

const router = Router();

router.get('/', getAllArticles);

router.use(authToken);

router.post(
  '/',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('content').isLength({ min: 1, max: 255 }),
  ],
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

export default router;
