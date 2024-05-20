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
import { body } from 'express-validator';

const router = Router();

router.get('/', getAllUsers);

router.use(authToken);

router.get('/me', getOwnProfile);
router.get('/:user_id', getUserById);
router.put(
  '/:user_id',
  [
    body('name').isString().isLength({ min: 5 }),
    body('jurusan').isString().isLength({ min: 5 }),
    body('telepon').isString().isLength({ min: 10, max: 13 }),
    body('email').isEmail(),
  ],
  updateUser
);

export default router;
