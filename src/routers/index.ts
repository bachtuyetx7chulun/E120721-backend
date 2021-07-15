import { Router } from 'express';
import {
    crawlPerDays,
    getAllDatas,
    crawlDetails,
} from '../controllers/api.controller';
const router = Router();

router.get('/covid', getAllDatas);
router.get('/crawl', crawlPerDays);
router.get('/detail', crawlDetails);

export default router;
