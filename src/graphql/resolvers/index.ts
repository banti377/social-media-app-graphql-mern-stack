import { postResolvers } from './Post';
import { userResolver } from './User';

export const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};
