import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'users' });
});

router.get('/:user_id', (req, res) => {});
router.post('/login', (req, res) => {});
router.post('/register', (req, res) => {});
router.patch('/:user_id', (req, res) => {});

export default router;
