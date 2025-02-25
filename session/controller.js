import pool from '../db.js'
import getId from '../utils.js'

export const stopSession=async(req,res)=>{
    try{
        console.log("session entry")
        const id=getId(req);
        await pool.query('Update session set session_status=\'stopped\' where id=$1 returning *',[id]);
        await pool.query('update charging_connector set session_status=\'available\' where id=(select charger_and_connector from session where id=$1) returning *',[id]);
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