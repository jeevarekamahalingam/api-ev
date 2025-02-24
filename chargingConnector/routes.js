import express from 'express'
import {updateConnector} from './controller.js';

const router=express.Router();
router.put('/:id',updateConnector);

export default router;