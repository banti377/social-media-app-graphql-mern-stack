import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';

import { connectDb } from './db';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

connectDb()
  .then(() => {
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`));
