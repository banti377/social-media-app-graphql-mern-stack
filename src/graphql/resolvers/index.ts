import { postResolvers } from './Post';
import { userResolver } from './User';

export const resolvers = {
  Post: {
    likeCount: (parent: any) => parent.likes.length,
    commentCount: (parent: any) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolvers.Mutation,
  },
};
