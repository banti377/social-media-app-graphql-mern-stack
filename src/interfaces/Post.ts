import { Document, Types } from 'mongoose';

export interface ILike extends Document {
  _id: Types.ObjectId;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment extends Document {
  _id: Types.ObjectId;
  body: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost extends Document {
  _id: Types.ObjectId;
  username: string;
  body: string;
  comments: [IComment];
  likes: [ILike];
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
