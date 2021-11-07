export interface IComment {
  _id: string;
  username: string;
  body: string;
  createdAt: Date;
}

export interface ILike {
  _id: string;
  username: string;
  createdAt: string;
}

export interface IPost {
  _id: string;
  body: string;
  username: string;
  comments: [IComment];
  likes: [ILike];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}