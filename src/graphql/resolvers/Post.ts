import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from '../../controllers/Post';

export const postResolvers = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
