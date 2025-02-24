import pool from '../db.js';
import getId from '../utils.js'
export const getChargePointById = async (req, res) => {
    try {
      const id=getId(req);
      const result = await pool.query(
        'SELECT * FROM chargePoint WHERE id = $1 ',
        [id]
      );   
      if (result.rows.length === 0) return res.status(404).send('Charge Point Not Found');
      console.log(result.rows[0])
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

export const deleteChargePoint = async (req, res) => {
    try{
        const id=getId(req);
        await Promise.all([
            pool.query('UPDATE chargepoint SET is_deleted = true WHERE id = $1', [id]),
            pool.query('UPDATE charging_station  set no_of_charge_points=no_of_charge_points-1  where id=(select charging_station_id from chargepoint where id=$1);',[id]),
            pool.query('UPDATE charging_connector SET is_deleted = true WHERE charge_point_id = $1', [id])
        ]);
        res.send('Charging Station Deleted');
    }
    catch{
        console.error(err);
        res.status(500).send('Server Error');
    }
    return;
}
