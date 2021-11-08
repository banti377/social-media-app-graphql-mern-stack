import { FC, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext, AuthProvider } from './context/Auth';
import SinglePost from './pages/SinglePost';

const App: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate replace to="/" /> : <Register />}
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
