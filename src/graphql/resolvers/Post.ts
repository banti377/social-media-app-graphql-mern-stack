import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  createComment,
  deleteComment,
  likePost,
} from '../../controllers/Post';

export const postResolvers = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
    deletePost,
    createComment,
    deleteComment,
    likePost,
  },
};
