import React, { useContext } from "react";
import { Menu, Container, Dropdown, Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

export const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          Easy Travel
        </Menu.Item>

        <Menu.Item as={NavLink} exact to='/cars' name="Cars" />
        {user !== null && user!.status === "SudoAdmin" &&
          <Menu.Item as={NavLink} exact to='/admins' name="Admins" />}
        <Menu.Item name="Restaurants" />
        <Menu.Item as={NavLink} exact to='/hotels' name="Hotels" />
        <Menu.Item name="Good Plans" />

        {user! &&
          <Menu.Item position='right'>
            <Image avatar spaced='right' src='assets/user.png' />
            <Dropdown pointing='top left' text={user!.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/profile/username'} text='My profile'
                  icone='user' />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />

              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        }
      </Container>
    </Menu>
  );
};
