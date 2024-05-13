import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  register,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);

router.get('/:user_id', getUserById);
router.post('/login', (req, res) => {});
router.post('/register', register);
router.put('/:user_id', updateUser);

export default router;
