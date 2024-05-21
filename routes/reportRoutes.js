import { Router } from 'express';
import authToken from '../middlewares/authToken.js';
import {
  getAllReports,
  insertReport,
} from '../controllers/reportController.js';

const router = Router();

router.use(authToken);

router.get('/', getAllReports);
router.post('/', insertReport);

router.get('/:report_id', (req, res) => {});
router.put('/:report_id', (req, res) => {});

router.get('/sum', (req, res) => {});

export default router;
