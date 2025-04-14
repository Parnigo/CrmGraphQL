import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Go up one level and into SSL/
const sslPath = path.join(__dirname, '..', 'SSL');

const sslOptions = {
  key: fs.readFileSync(path.join(sslPath, 'ECC-privkey.pem')),
  cert: fs.readFileSync(path.join(sslPath, 'ECC-cert.pem')),
};

export default sslOptions;
