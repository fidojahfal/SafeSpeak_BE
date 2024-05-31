import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import { getAllArticles } from '../controllers/articleController.js';

const router = Router();

router.get('/', getAllArticles);

router.use(authToken);

router.post('/', () => {});
router.put('/', () => {});

export default router;
