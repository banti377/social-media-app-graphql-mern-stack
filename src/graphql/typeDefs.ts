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
    likeCount: Int!
    commentCount: Int!
    createdAt: Date!
  }

  type User {
    _id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
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
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Response!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Response!
    likePost(postId: ID!): Post!
  }
`;
