import { AuthenticationError, UserInputError } from 'apollo-server-errors';
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
    const { _id, username }: any = isAuth(context);

    const newPost = new Post({
      body: body,
      user: _id,
      username,
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
    const { username }: any = isAuth(context);

    const post: IPost | null = await Post.findById(postId);

    if (!post) {
      return new Error('Post not found');
    }

    if (username !== post.username) {
      return new AuthenticationError('Action not allowed');
    }

    post.delete();

    return { success: true };
  } catch (error: any) {
    return new Error(error);
  }
};

export const createComment = async (
  _: any,
  { postId, body }: { postId: Types.ObjectId; body: string },
  context: any
) => {
  try {
    const { username }: any = isAuth(context);

    if (body.trim() === '') {
      return new UserInputError('Empty comment', {
        errors: { body: 'Comment body must not be empty' },
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return new UserInputError('Post not found');
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            body,
            username,
          },
        },
      },
      { new: true, runValidators: true }
    );

    return updatedPost;
  } catch (error: any) {
    return new Error(error);
  }
};

export const deleteComment = async (
  _: any,
  { postId, commentId }: { postId: Types.ObjectId; commentId: Types.ObjectId },
  context: any
) => {
  try {
    const { username }: any = isAuth(context);

    const post = await Post.findById(postId);

    if (!post) {
      return new UserInputError('Post not found');
    }

    const deletedComment = await Post.findOneAndUpdate(
      {
        _id: postId,
        'comments.username': username,
        'comments._id': commentId,
      },
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (deletedComment) return { success: true };
    else return new AuthenticationError('Action not allowed');
  } catch (error: any) {
    return new Error(error);
  }
};

export const likePost = async (
  _: any,
  { postId }: { postId: Types.ObjectId },
  context: any
) => {
  try {
    const { username }: any = isAuth(context);

    const post = await Post.findById(postId);

    if (!post) {
      return new UserInputError('Post not found');
    }

    const likedPost = await Post.findOne({
      _id: postId,
      'likes.username': username,
    });

    if (likedPost) {
      const unlikedPost = await Post.findOneAndUpdate(
        {
          _id: postId,
          'likes.username': username,
        },
        {
          $pull: {
            likes: {
              username,
            },
          },
        },
        { new: true, runValidators: true }
      );

      if (unlikedPost) return unlikedPost;
      else return new AuthenticationError('Action not allowed');
    } else {
      const likedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: { username } },
        },
        { new: true, runValidators: true }
      );

      if (likedPost) return likedPost;
      else return new AuthenticationError('Action not allowed');
    }
  } catch (error: any) {
    return new Error(error);
  }
};
