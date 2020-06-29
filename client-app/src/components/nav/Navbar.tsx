import React, { useContext } from "react";
import { Menu, Container, Dropdown, Image, Icon, Button, MenuItem } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { LoginForm } from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          Easy Travel
        </Menu.Item>


        <Menu.Item icon='hotel' as={NavLink} exact to='/hotels' name="Hotels" />
        <Menu.Item icon='plane' as={NavLink} exact to='/flights' name="Flight Tickets" />
        <Menu.Item icon='car' as={NavLink} exact to='/cars' name="Cars" />
       

        <Menu.Item icon='food' as={NavLink} exact to='/restaurants' name="Restaurants" />

        <Menu.Item icon='ticket' as={NavLink} exact to='/activities' name="Activities" />

        {user?.status === "Client" &&
        <Menu.Item position='right'>
          <Icon name='cart' />
              
                  <Dropdown text='My Bookings' pointing>
                    <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'HotelBookings'} text='My Hotel Bookings' icon='hotel' />
                      <Dropdown.Item icon='plane' as={Link} to={'FlightBookings'} text='My Flight Bookings' />
                      <Dropdown.Item icon='food' as={Link} to={'RestaurantBookings'} text='My Restaurant Bookings' />
                      <Dropdown.Item icon='ticket' text='My Activity Bookings' as={Link} to={'ActivityBookings'}/>
                      <Dropdown.Item text='My Car Bookings' icon='car' as={Link} to={'CarBookings'}/> 
                    </Dropdown.Menu>
                    </Dropdown>
                
                  </Menu.Item>
                }
                 {user !== null && user!.status === "SudoAdmin" &&
          <Menu.Item icon='user' as={NavLink} exact to='/admins' name="Admins" />}

        {user === null && 
        <Menu.Menu position='right'>
        <Menu.Item content="Log In" onClick={() => openModal(<LoginForm />)} />
        <Menu.Item content="Sign Up" onClick={() => openModal(<RegisterForm />)} />
        </Menu.Menu>
        }
        {user! &&
          <Menu.Item position='right'>
            <Image avatar spaced='right' src='assets/user.png' />
            <Dropdown pointing text={user!.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/profile/username'} text='My profile'
                  icon='user' />
                  <Dropdown.Item as={Link} to={'Myarticles'} text='My articles'
                  icon='quote right' />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />

              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        }
        
      </Container>
    </Menu>
  );
};
