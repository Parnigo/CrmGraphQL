import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema.js';
import authRedirectMiddleware from '../middleware/authRedirect.js';

const router = express.Router();

router.use(
  '/',
  authRedirectMiddleware,
  graphqlHTTP({
    schema,
    graphiql: {
      headerEditorEnabled: true
    },
    customHeaders: (req) => {
      const token = req.headers.authorization;
      return token ? { Authorization: token } : {};
    },
    context: ({ req }) => ({ user: req.user })
  })
);

export default router;
