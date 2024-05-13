import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  return res.status(200).json({ message: 'users' });
});

router.get('/users/:user_id', (req, res) => {});
router.post('/login', (req, res) => {});
router.post('/register', (req, res) => {});
router.patch('/users/:user_id', (req, res) => {});

export default router;
