import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
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
      likes {
        createdAt
        _id
        username
      }
      likeCount
      commentCount
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      body
      username
      createdAt
      comments {
        username
        createdAt
        body
        _id
      }
      likes {
        createdAt
        username
        _id
      }
      likeCount
      commentCount
    }
  }
`;
