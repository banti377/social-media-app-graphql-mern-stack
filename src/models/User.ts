import { model, Schema } from 'mongoose';

import { IUser } from '../interfaces/User';

const userSchema: Schema<IUser> = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
