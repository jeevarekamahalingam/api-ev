import express from 'express';
import {  getChargePointById,deleteChargePoint} from './controller.js';

const router = express.Router();
// router.post('/', createStation);
// router.get('/', getAllStations);
router.get('/:id', getChargePointById);
// router.put('/:id', updateStation);
router.delete('/:id', deleteChargePoint);

export default router;
