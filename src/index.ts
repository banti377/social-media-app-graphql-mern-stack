import { ApolloServer, gql } from 'apollo-server';
import dotenv from 'dotenv';

import { connectDb } from './db';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });

connectDb()
  .then(() => server.listen({ port: 5000 }))
  .then((res) => console.log(`Server running at ${res.url}`));
