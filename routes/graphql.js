import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(
  '/',
  authMiddleware,
  graphqlHTTP({
    schema,
    graphiql: true, // or false in production
  })
);

export default router;