import { AuthenticationError } from 'apollo-server-errors';
import { Types } from 'mongoose';
import { IPost } from '../interfaces/Post';
import { IUser } from '../interfaces/User';
import Post from '../models/Post';
import { isAuth } from '../utilities/Auth';

export const getPosts = async () => {
  try {
    const posts: IPost[] | [] = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPost = async (
  _: any,
  { postId }: { postId: Types.ObjectId }
) => {
  try {
    const post: IPost | null = await Post.findById(postId);

    if (!post) {
      return new Error('Post not found');
    }

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createPost = async (
  _: any,
  { body }: { body: string },
  context: any
) => {
  try {
    const user: any = isAuth(context);

    const newPost = new Post({
      body: body,
      user: user._id,
      username: user.username,
    });

    const post: IPost | null = await newPost.save();

    return post;
  } catch (error: any) {
    return new Error(error);
  }
};

export const deletePost = async (
  _: any,
  { postId }: { postId: Types.ObjectId },
  context: any
) => {
  try {
    const user: any = isAuth(context);

    const post: IPost | null = await Post.findById(postId);

    if (!post) {
      return new Error('Post not found');
    }

    if (user.username !== post.username) {
      return new AuthenticationError('Action not allowed');
    }

    post.delete();

    return { success: true };
  } catch (error: any) {
    return new Error(error);
  }
};
