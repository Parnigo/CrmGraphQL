import express from 'express';
import { createYoga } from 'graphql-yoga';
import { createSchema } from 'graphql-yoga';
import { loadFiles } from '@graphql-tools/load-files';
import { fileURLToPath } from 'url';
import path from 'path';
import authMiddleware from './middleware/auth.js';
import loginRoutes from './routes/login.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = await loadFiles(path.join(__dirname, 'graphql/typeDefs'), {
  extensions: ['graphql'],
});

const resolverModules = await loadFiles(path.join(__dirname, 'graphql/resolvers'), {
  extensions: ['js'],
});
const resolvers = resolverModules.map((mod) => mod.default);

const schema = createSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use('/login', loginRoutes);

// Protect GraphQL endpoint
const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  graphiql: process.env.NODE_ENV !== 'production',
  context: ({ request }) => {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    return { token };
  },
});

app.use('/graphql', authMiddleware, yoga);

export default app;
