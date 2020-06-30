import React, { useContext, Fragment } from 'react'
import { Segment, Container, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore'
import { LoginForm } from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

const WelcomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header>

                </Header>
                {isLoggedIn && user ? (
                    <Fragment>
                        <Header as='h2' inverted content={`Welcome back ${user.displayName}`}>

                        </Header>
                        <Button as={Link} to='/Home' size='huge' inverted>
                            Go to Cars
                        </Button>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Header as='h1' inverted>
                                <Image suze="massive" src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                                Easy Travel
                            </Header>
                            <Header as='h2' inverted content='Easily Discover the World !'>

                            </Header>
                            <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                                Log in
                            </Button>
                            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                                Sign Up
                            </Button>
                            <Button as={Link} to='/Home' size='huge' inverted>
                                Take a tour
                            </Button>

                        </Fragment>
                    )
                }

            </Container>
        </Segment>
    )
}

export default WelcomePage
