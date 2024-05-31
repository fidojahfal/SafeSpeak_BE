import { Router } from 'express';
import authToken from '../middlewares/authToken.js';

const router = Router();

router.get('/', () => {});

router.use(authToken);

router.post('/', () => {});
router.put('/', () => {});

export default router;
