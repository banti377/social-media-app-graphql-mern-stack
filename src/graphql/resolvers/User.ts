import { register, login } from '../../controllers/User';

export const userResolver = {
  Mutation: {
    register,
    login,
  },
};
