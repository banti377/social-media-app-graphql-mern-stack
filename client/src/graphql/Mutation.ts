import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      _id
      username
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      email
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      _id
      body
      username
      createdAt
      comments {
        createdAt
        username
        body
        _id
      }
      likeCount
      commentCount
      likes {
        username
        createdAt
        _id
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      body
      username
      comments {
        _id
        body
        createdAt
        username
      }
      likes {
        _id
        username
        createdAt
      }
      createdAt
      likeCount
      commentCount
    }
  }
`;
