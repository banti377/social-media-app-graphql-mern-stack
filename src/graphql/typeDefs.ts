import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  type Post {
    _id: ID!
    body: String!
    username: String!
    createdAt: Date!
  }

  type User {
    _id: ID!
    email: String!
    username: String!
    createdAt: String!
  }

  type AuthData {
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthData!
    login(username: String!, password: String!): AuthData!
  }
`;
