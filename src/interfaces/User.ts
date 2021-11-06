import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegisterInput {
  registerInput: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface ILoginInput {
  username: string;
  password: string;
}
