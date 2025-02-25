import express from'express';
import {stopSession,getSessionHistory} from './controller.js';

const router=express.Router();
router.put('/stop-session/:id',stopSession);
router.get('/session-history/:id',getSessionHistory);
export default router;