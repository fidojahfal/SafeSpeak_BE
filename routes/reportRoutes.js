import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  countReports,
  deleteReport,
  getAllReports,
  getReportById,
  insertReport,
  updateReport,
} from '../controllers/reportController.js';

const router = Router();

router.get('/sum', countReports);
router.use(authToken);

router.get('/', getAllReports);
router.post('/', insertReport);

router.get('/:report_id', getReportById);
router.put('/:report_id', updateReport);
router.delete('/:report_id', deleteReport);

export default router;
