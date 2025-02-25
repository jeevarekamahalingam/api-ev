import express from 'express';
import {getBalance} from './controller.js';
const router=express.Router();
router.get('/wallet-balance/:id',getBalance);
export default router;