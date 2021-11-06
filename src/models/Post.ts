import { model, Schema } from 'mongoose';

import { ILike, IComment, IPost } from '../interfaces/Post';

const commentSchema: Schema<IComment> = new Schema(
  {
    body: String,
    username: String,
  },
  { timestamps: true }
);

const likeSchema: Schema<ILike> = new Schema(
  {
    username: String,
  },
  { timestamps: true }
);

const postSchema: Schema<IPost> = new Schema(
  {
    username: String,
    body: String,
    comments: [commentSchema],
    likes: [likeSchema],
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

export default model<IPost>('Post', postSchema);
