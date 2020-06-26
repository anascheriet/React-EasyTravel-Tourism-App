import React, { useContext, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Image, Item, Segment, Button, Grid, Icon, Header, Comment, Form } from 'semantic-ui-react';
import RestaurantBooking from '../../form/RestaurantBooking';

const restaurantImageStyle = {
    filter: 'brightness(50%)'
}
const restaurantImageTextStyle = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};


interface offerId {
    id: string;
}


const RestaurantOffer: React.FC<RouteComponentProps<offerId>> = ({ match }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadOfferedRestaurant, OfferedRestaurant, restaurantBookingToAdd } = rootStore.restaurantStore;
    const { openModal } = rootStore.modalStore;

    useEffect(() => {

        loadOfferedRestaurant(match.params.id);
    }, [match.params.id, loadOfferedRestaurant])

    restaurantBookingToAdd!.productId = match.params.id;
    
    return (
        <Grid>
            <Grid.Column width={10}>



                {/* Car Header */}

                <Segment.Group>
                    <Segment basic attached='top' style={{ padding: '0' }}>
                        <Image src={`/assets/mealImages/${OfferedRestaurant?.name}.jpg`}  style={restaurantImageStyle} fluid />
                        <Segment basic style={restaurantImageTextStyle} >
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <h1><b>{OfferedRestaurant?.name}</b></h1>
                                        <p>
                                            {/* <strong>{OfferedRestaurant?.options} </strong> */}
                                        </p>
                                        <p>
                                            Cuisine Type: <strong>{OfferedRestaurant?.meals}</strong>
                                        </p>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    </Segment>
                    <Segment clearing attached='bottom'>
                        <Button color='orange' onClick={() => openModal(<RestaurantBooking />)}>Book This Restaurant</Button>
                    </Segment>
                </Segment.Group>

                {/* Car Info  */}

                <Segment.Group>
                    <Segment attached='top'>
                        <Grid>
                            <Grid.Column width={1}>
                                <Icon size='large' color='teal' name='info' />
                            </Grid.Column>
                            <Grid.Column width={15}>
                                <p>{OfferedRestaurant?.description}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached>
                        <Grid verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='teal' />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <span>{OfferedRestaurant?.adress}, {OfferedRestaurant?.city}, {OfferedRestaurant?.country}</span>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached='top'>
                        <Grid  verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon size='large' color='teal' name='phone' />
                            </Grid.Column>
                            <Grid.Column width={15}>
                                <p>{OfferedRestaurant?.phoneNumber}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Segment.Group>





            </Grid.Column>
            <Grid.Column width={6}>
                {/* Car Comments */}


                <Fragment>
                    <Segment
                        textAlign='center'
                        attached='top'
                        inverted
                        color='teal'
                        style={{ border: 'none' }}
                    >
                        <Header>Reviews</Header>
                    </Segment>
                    <Segment attached>
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src='/assets/user.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Matt</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Such A Great Experience!</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='/assets/user.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                                    <Comment.Metadata>
                                        <div>5 days ago</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Had an Amazing Time!</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>

                            <Form reply>
                                <Form.TextArea />
                                <Button
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                />
                            </Form>
                        </Comment.Group>
                    </Segment>
                </Fragment>
            </Grid.Column>

        </Grid>
    )
}

export default observer(RestaurantOffer)
