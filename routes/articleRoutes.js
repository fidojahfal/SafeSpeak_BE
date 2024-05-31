import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllArticles,
  insertArticle,
  updateArticle,
} from '../controllers/articleController.js';

const router = Router();

router.get('/', getAllArticles);

router.use(authToken);

router.post('/', insertArticle);
router.put('/:article_id', updateArticle);

export default router;
