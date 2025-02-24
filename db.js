import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
try {
  await pool.connect();
  let id=2;

  
  console.log('DB is connected ');
} catch (err) {
  console.error('DB connection error:', err);
}
export default pool;