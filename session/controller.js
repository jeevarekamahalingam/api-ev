import pool from '../db.js'
import getId from '../utils.js'

export const stopSession=async(req,res)=>{
    try{
        console.log("session entry")
        const id=getId(req);
        await pool.query('Update session set session_status="stopped"where id=$1 returning *',[id]);
        res.send("stopped session");
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
}