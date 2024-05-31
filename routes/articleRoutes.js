import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllArticles,
  insertArticle,
} from '../controllers/articleController.js';

const router = Router();

router.get('/', getAllArticles);

router.use(authToken);

router.post('/', insertArticle);
router.put('/', () => {});

export default router;
