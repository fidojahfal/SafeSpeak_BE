import { Router } from 'express';
import {
  getAllUsers,
  getOwnProfile,
  getUserById,
  login,
  register,
  updateUser,
} from '../controllers/userController.js';
import authToken from '../middlewares/authToken.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/login', login);
router.post('/register', register);

router.use(authToken);

router.get('/me', getOwnProfile);
router.get('/:user_id', getUserById);
router.put('/:user_id', updateUser);

export default router;
