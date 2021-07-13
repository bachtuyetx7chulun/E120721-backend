import { Router } from 'express';
const router = Router();
import {
    crawlDatas,
    getAllDatas,
    updateData,
    crawlPupetteer,
} from '../controllers/api.controller';

router.get('/covid', getAllDatas);
// router.get('/', crawlDatas);
router.get('/crawl', crawlPupetteer);
router.get('/update', updateData);

export default router;
