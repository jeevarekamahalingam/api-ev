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