import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  deleteArticle,
  getAllArticles,
  insertArticle,
  updateArticle,
  getArticleById,
} from '../controllers/articleController.js';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir = 'public/temp/';
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    // Buat nama file yang unik
    const filename = `file_${Date.now()}${path.extname(file.originalname)}`;
    callback(null, filename);
  },
});

const upload = multer({ storage, limits: { fileSize: 5000000 } });

router.get('/', getAllArticles);
router.get('/:article_id', getArticleById);

router.use(authToken);

router.post(
  '/',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('content').isLength({ min: 1, max: 255 }),
  ],
  upload.single('image'),
  insertArticle
);
router.put(
  '/:article_id',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('content').isLength({ min: 1, max: 255 }),
  ],
  upload.single('image'),
  updateArticle
);

router.delete('/:article_id', deleteArticle);

export default router;
