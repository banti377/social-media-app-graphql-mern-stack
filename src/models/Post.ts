import { model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    body: String,
    username: String,
  },
  { timestamps: true }
);

const likeSchema = new Schema(
  {
    username: String,
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    username: String,
    body: String,
    comments: [commentSchema],
    likes: [likeSchema],
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

export default model('Post', postSchema);
