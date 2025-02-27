import pool from '../db.js';
import getId from '../utils.js';

export const getBalance=async(req,res)=>{
   
    try{
        const id=getId(req);
        const balance=await pool.query('select total_amount from wallet where customer_id=$1',[id]);
        res.json(balance.rows[0].total_amount);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
}

// export const deductWallet=async(req,res)=>{
//     try{
//         id=getId(req);
//         await pool.query('  Update session set session_status=\'stopped\',end_time=now(),charge_duration=now()-started_time where id=$1 returning *',[id]);
//         await pool.query('update charging_connector set session_status=\'available\' where id=(select charger_and_connector from session where id=$1) returning *',[id]);
//         await pool.query      
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// }