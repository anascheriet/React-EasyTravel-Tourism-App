import React, { useContext } from 'react'
import { Header, Button, ButtonGroup, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../stores/rootStore';
import { LoginForm } from '../../components/users/LoginForm';
import RegisterForm from '../../components/users/RegisterForm';

export const NeedToSigIn = () => {
  const rootStore = useContext(RootStoreContext);
  const {user} = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
    return (
        <div>
          <Segment clearing>
        <Header>You're not signed in !</Header>
        <Header.Content  inverted color='red'>
          <p>Log in or sign up if you don't have an account </p>
          <ButtonGroup floated="right">
          <Button content="Log In" basic color="teal" onClick={() => openModal(<LoginForm />)} />
          <Button content="Sign Up" basic color="teal" onClick={() => openModal(<RegisterForm />)} />
          </ButtonGroup>
        </Header.Content>
        </Segment>
        </div>
    )
}


