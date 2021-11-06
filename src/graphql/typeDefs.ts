import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: Date!
  }

  type Query {
    getPosts: [Post!]!
  }
`;
