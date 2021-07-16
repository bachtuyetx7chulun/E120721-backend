import { Router } from 'express';
import {
    crawlPerDay,
    getAllDatas,
    crawlDetails,
} from '../controllers/api.controller';
const router = Router();

router.get('/covid', getAllDatas);
router.get('/crawl', crawlPerDay);
router.get('/overview', crawlDetails);

export default router;
