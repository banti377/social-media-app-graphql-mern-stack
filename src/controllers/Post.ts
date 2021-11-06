import Post from '../models/Post';

export const getPosts = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};
