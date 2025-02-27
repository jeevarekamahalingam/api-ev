import express from'express';
import {stopSession,getSessionHistory,getSessionHistoryOfCharger} from './controller.js';

const router=express.Router();
router.put('/stop-session/:id',stopSession);
router.get('/session-history/:id',getSessionHistory);
router.get('/getHistoryByCharger',getSessionHistoryOfCharger);
export default router;