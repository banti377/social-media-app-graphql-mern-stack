import { FC, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItemProps } from 'semantic-ui-react';

import { AuthContext } from '../context/Auth';

const MenuBar: FC = () => {
  const { user, logout } = useContext(AuthContext);

  const { pathname } = useLocation();

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState<string | undefined>(path);

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps
  ) => setActiveItem(name);

  return user ? (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={user.username} active as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} as={Link} to="/login" />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default MenuBar;
