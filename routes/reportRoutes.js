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

const router = Router();

router.get('/sum', countReports);
router.use(authToken);

router.get('/', getAllReports);
router.get('/user/:user_id', getReportsByUserId);
router.post(
  '/',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('type').notEmpty(),
    body('place_report').isLength({ min: 1, max: 255 }),
    body('date_report').isDate(),
    body('description').isLength({ min: 1, max: 2000 }),
    body('evidence').notEmpty(),
    body('is_anonim').notEmpty(),
  ],
  insertReport
);

router.get('/:report_id', getReportById);
router.put(
  '/:report_id',
  [
    body('title').isLength({ min: 1, max: 255 }),
    body('type').notEmpty(),
    body('place_report').isLength({ min: 1, max: 255 }),
    body('date_report').isDate(),
    body('description').isLength({ min: 1, max: 2000 }),
    body('evidence').notEmpty(),
    body('is_anonim').notEmpty(),
  ],
  updateReport
);
router.put('/:report_id/status', [body('status').notEmpty()], updateStatus);
router.delete('/:report_id', deleteReport);

export default router;
