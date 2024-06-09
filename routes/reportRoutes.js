import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  countReports,
  deleteReport,
  getAllReports,
  getReportById,
  getReportsByUserId,
  insertReport,
  updateReport,
  updateStatus,
} from '../controllers/reportController.js';
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

const upload = multer({ storage, limits: { fileSize: 15000000 } });

router.get('/sum', countReports);
router.use(authToken);

router.get('/', getAllReports);
router.get('/user/:user_id', getReportsByUserId);
router.post(
  '/',
  upload.single('evidence'),
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('type').notEmpty(),
    body('place_report').isLength({ min: 1, max: 255 }),
    body('date_report').isDate(),
    body('description').isLength({ min: 1, max: 2000 }),
    body('is_anonim').notEmpty(),
  ],
  insertReport
);

router.get('/:report_id', getReportById);
router.put(
  '/:report_id',
  upload.single('evidence'),
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('type').notEmpty(),
    body('place_report').isLength({ min: 1, max: 255 }),
    body('date_report').isDate(),
    body('description').isLength({ min: 1, max: 2000 }),
    body('is_anonim').notEmpty(),
  ],
  updateReport
);
router.put('/:report_id/status', [body('status').notEmpty()], updateStatus);
router.delete('/:report_id', deleteReport);

export default router;
