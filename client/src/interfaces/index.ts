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

export interface ILoginError {
  username?: string;
  password?: string;
  general?: string;
}

export interface IRegisterError {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  email: string;
}

export interface IAuthReducerInitailState {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

interface LoginAction {
  type: 'login';
  payload: IUser;
}

interface LogoutAction {
  type: 'logout';
}

export type Action = LoginAction | LogoutAction;
