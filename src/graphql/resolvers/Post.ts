import { getPosts } from '../../controllers/Post';

export const postResolvers = {
  Query: {
    getPosts,
  },
};
