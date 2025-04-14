import 'dotenv/config';
import https from 'https';
import path from 'path';
import app from './app.js';
import sslOptions from './config/sslOptions.js';

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Version 2005.04.14.00`);
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on https://localhost:${PORT}`);
});
