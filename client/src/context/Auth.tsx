import { createContext, FC, useReducer } from 'react';
import { Action, IAuthReducerInitailState, IUser } from '../interfaces';
import jwtDecode from 'jwt-decode';

const initialState: IAuthReducerInitailState = {
  user: null,
  login: (user: IUser) => {},
  logout: () => {},
};

if (localStorage.getItem('token')) {
  const decodedToken: any = jwtDecode(localStorage.getItem('token')!);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

export const AuthContext = createContext(initialState);

const authReducer = (
  state: IAuthReducerInitailState,
  action: Action
): IAuthReducerInitailState => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider: FC = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: IUser) => {
    localStorage.setItem('token', user.token);
    dispatch({ type: 'login', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};
