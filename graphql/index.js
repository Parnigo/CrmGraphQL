import path from 'path';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = loadFilesSync(path.join(__dirname, 'typeDefs'), {
  extensions: ['graphql']
});

export const resolvers = loadFilesSync(path.join(__dirname, 'resolvers'));
