import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);

router.get('/:user_id', getUserById);
router.post('/login', login);
router.post('/register', register);
router.put('/:user_id', updateUser);

export default router;
