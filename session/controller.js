import pool from '../db.js'
import getId from '../utils.js'

export const stopSession=async(req,res)=>{
    try{
        console.log("session entry")
        const id=getId(req);
        await pool.query('  Update session set session_status=\'stopped\',end_time=now(),charge_duration=now()-started_time where id=$1 returning *',[id]);
        await pool.query('update charging_connector set session_status=\'available\' where id=(select charger_and_connector from session where id=$1) returning *',[id]);
        await pool.query('  update wallet set balance_amount=balance_amount-(Select total_cost from session where id=$1) where id=(Select customer_id from session  as s where id=$1) returning balance_amount;',[id,id]);
        res.send("stopped session");
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
}

export const getSessionHistory=async(req,res)=>{
    try{
        const id=getId(req);
        const result=await pool.query('select * from session where customer_id=$1',[id]);
        res.send(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const getSessionHistoryOfCharger=async(req,res)=>{
    try{
        const result=await pool.query('SELECT c.charge_point_id, COUNT(s.id) AS total_sessions,SUM(s.units_consumed_kwh) AS total_energy_consumed FROM session s JOIN charging_connector c ON s.charger_and_connector = c.id GROUP BY c.charge_point_id order by c.charge_point_id');
        res.send(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}