import { Router } from 'express';
import authToken from '../middlewares/authToken';

const router = Router();

router.use(authToken);

router.get('/', (req, res) => {});
router.post('/', (req, res) => {});

router.get('/:report_id', (req, res) => {});
router.put('/:report_id', (req, res) => {});

router.get('/sum', (req, res) => {});

export default router;
