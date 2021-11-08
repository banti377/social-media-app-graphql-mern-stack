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

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      success
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      success
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      _id
      body
      username
      comments {
        _id
        username
        createdAt
        body
      }
      createdAt
      likes {
        _id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;
