import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllReports,
  getReportById,
  insertReport,
  updateReport,
} from '../controllers/reportController.js';

const router = Router();

router.use(authToken);

router.get('/', getAllReports);
router.post('/', insertReport);

router.get('/:report_id', getReportById);
router.put('/:report_id', updateReport);

router.get('/sum', (req, res) => {});

export default router;
