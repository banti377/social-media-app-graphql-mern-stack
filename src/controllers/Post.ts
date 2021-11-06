import Post from '../models/Post';

export const getPosts = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (e: any) {
    return new Error(e.message);
  }
};
