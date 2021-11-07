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
