import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  type Comment {
    _id: ID!
    body: String!
    username: String!
    createdAt: Date!
  }

  type Like {
    _id: ID!
    username: String!
    createdAt: Date!
  }

  type Post {
    _id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
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

  type Response {
    success: Boolean
  }

  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): AuthData!
    login(username: String!, password: String!): AuthData!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Response!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Response!
    likePost(postId: ID!): Post!
  }
`;
