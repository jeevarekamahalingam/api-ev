import express from'express';
import {stopSession} from './controller.js';

const router=express.Router();
router.put('/stop-session/:id',stopSession);
export default router;