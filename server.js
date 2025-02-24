import express from 'express';
import pool from './db.js';
import dotenv from 'dotenv';
import chargingStationRoutes from './chargingStation/routes.js';
import chargePointRoutes from './chargePoint/routes.js';
import chargeConnector from './chargingConnector/routes.js'
import session from './session/routes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json()); 
app.use('/api/charging-station',chargingStationRoutes);
app.use('/api/charge-point',chargePointRoutes);
app.use('/api/charge-connector',chargeConnector);
app.use('/api/session',session);
 app.get('/', (req, res) => { res.send('Hello from Express.js!'); });
app.listen(PORT, (err) => {
  if(err)console.log("error found");
  console.log(`Server running at http://localhost:${PORT}`);
});




// import express from 'express';
//  const app = express(); 
//  const port = process.env.PORT || 3000; 
//  console.log(port);
//  app.get('/', (req, res) => { res.send('Hello from Express.js!'); });
//   app.listen(port, () => { console.log(`Server listening on port ${port}`); });
// export function myFunction(arg) { 
//   return `Hello from my ES7 module! You passed in: ${arg}`; }
// export const myVariable = 42; // Or if you are creating a server
// import http from 'http';
// const server = http.createServer((req, res) => { 
//   res.writeHead(200, { 'Content-Type': 'text/plain' }); 
//   res.end('Hello from my ES7 module server!'); });
// const port = 3000; 
// server.listen(port, () => { console.log(`Server running at http://localhost:${port}`); });