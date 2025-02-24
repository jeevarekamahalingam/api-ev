import pool from '../db.js';
import getId from '../utils.js';

export const updateConnector=async(req,res)=>{
    try{
        const id=getId(req);
        const {connector_type,peak_power,session_status,charge_point_id,station_id,is_deleted}=req.body;
        //console.log(connector_type,peak_power,session_status,charge_point_id,station_id,is_deleted);
        const result=await pool.query('update charging_connector set connector_type=$1,peak_power=$2,session_status=$3,charge_point_id=$4,station_id=$5,is_deleted=$6 where id=$7 returning *',[connector_type,peak_power,session_status,charge_point_id,station_id,is_deleted,id]);
        console.log(result);
        if (result.rows.length === 0) return res.status(404).send('Charge-connector not found');
        res.json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}