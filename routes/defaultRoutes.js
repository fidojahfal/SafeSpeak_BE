import { Router } from 'express';
import { login, register } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = Router();

router.post('/login', login);
router.post(
  '/register',
  [
    body('username').isLength({ min: 5 }).isString(),
    body('password').isLength({ min: 8 }).isString(),
    body('name').isString().isLength({ min: 5 }),
    body('jurusan').isString().isLength({ min: 5 }),
    body('telepon').isString().isLength({ min: 10, max: 13 }),
    body('email').isEmail(),
    body('nim').isNumeric().isLength({ min: 6 }),
  ],
  register
);

export default router;
