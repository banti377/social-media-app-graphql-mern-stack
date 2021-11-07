import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';

import { IUser, IRegisterInput, ILoginInput } from '../interfaces/User';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../utilities/Validators';

const generateToken = (user: IUser) =>
  jwt.sign(
    {
      _id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

export const register = async (
  _: any,
  {
    registerInput: { username, email, password, confirmPassword },
  }: IRegisterInput
) => {
  try {
    const { valid, errors } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );

    if (!valid) {
      return new UserInputError('Errors', { errors });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return new UserInputError('Username is taken', {
        errors: {
          username: 'This username is taken',
        },
      });
    }

    password = await bcrypt.hash(password, 12);

    const user: IUser = new User({
      email,
      username,
      password,
    });

    const newUser: any = await user.save();

    const token = generateToken(newUser);

    return { token };
  } catch (error: any) {
    return new Error(error);
  }
};

export const login = async (_: any, { username, password }: ILoginInput) => {
  try {
    const { valid, errors } = validateLoginInput(username, password);

    if (!valid) {
      return new UserInputError('Errors', { errors });
    }

    const user = await User.findOne({ username });

    if (!user) {
      errors.general = 'User not found';
      return new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      errors.general = 'Wrong credentials';
      return new AuthenticationError('Wrong credentials', { errors });
    }

    const token = generateToken(user);
    return { token };
  } catch (error: any) {
    return new Error(error);
  }
};
