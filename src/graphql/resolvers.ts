import { postResolvers } from './resolvers/Post';

const postQuery = {
  getPosts: postResolvers.Query.getPosts,
};

export const resolvers = {
  Query: {
    ...postQuery,
  },
};
