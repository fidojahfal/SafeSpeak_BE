import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllReports,
  getReportById,
  insertReport,
} from '../controllers/reportController.js';

const router = Router();

router.use(authToken);

router.get('/', getAllReports);
router.post('/', insertReport);

router.get('/:report_id', getReportById);
router.put('/:report_id', (req, res) => {});

router.get('/sum', (req, res) => {});

export default router;
