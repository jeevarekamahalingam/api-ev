import pool from '../db.js';
import getId from '../utils.js'

export const createStation = async (req, res) => {
  try {
    const { charge_point_name, no_of_charge_points, sanctioned_load_kw, address, cpo_number } = req.body;
    const result = await pool.query(
      'INSERT INTO charging_station (charge_point_name, no_of_charge_points, sanctioned_load_kw, address, cpo_number, is_deleted) VALUES ($1, $2, $3, $4, $5, false) RETURNING *',
      [charge_point_name, no_of_charge_points, sanctioned_load_kw, address, cpo_number]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getAllStations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM charging_station WHERE is_deleted = false');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getStationById = async (req, res) => {
  try {
    const id=getId(req);
    const result = await pool.query(
      'SELECT * FROM charging_station WHERE id = $1 ',
      [id]
    );   
    if (result.rows.length === 0) return res.status(404).send('Charging Station Not Found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const updateStation = async (req, res) => {
  try {
    const id=getId(req);
    const { charge_point_name, no_of_charge_points, sanctioned_load_kw, address, cpo_number } = req.body;
    const result = await pool.query(
      'UPDATE charging_station SET charge_point_name=$1, no_of_charge_points=$2, sanctioned_load_kw=$3, address=$4, cpo_number=$5 WHERE id=$6 RETURNING *',
      [charge_point_name, no_of_charge_points, sanctioned_load_kw, address, cpo_number, id]
    );
    // console.log(result);
    if (result.rows.length === 0) return res.status(404).send('Charging Station Not Found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
