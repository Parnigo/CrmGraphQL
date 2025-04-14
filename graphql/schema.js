import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers.js';

const typeDefs = `#graphql
  type Query {
    users(username: String, limit: Int, offset: Int): [User]
    getContacts(contId: Int, firstName: String, lastName: String, limit: Int, offset: Int): [Contact]
    getContactsWithNotes(contId: Int, firstName: String, lastName: String, limit: Int, offset: Int): [ContactWithNotes]
  }

  type User {
    userId: Int
    username: String
    email: String
  }

  type Contact {
    contId: Int
    firstName: String
    lastName: String
  }

  type Note {
    noteId: Int
    contId: Int
    note: String
  }

  type ContactWithNotes {
    contId: Int
    firstName: String
    lastName: String
    notes: [Note]
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: resolvers,
  },
});

export default schema;
