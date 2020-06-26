import React, { useEffect, useContext, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid, Segment, Image, Item, Button, Icon, Header, Comment, Form } from 'semantic-ui-react';
import HotelBooking from '../../form/HotelBooking';


const hotelImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'black'
};

interface offerId {
    id: string;
}

const HotelOffer: React.FC<RouteComponentProps<offerId>> = ({
    match
}) => {

    const rootStore = useContext(RootStoreContext);
    const { loadOfferedHotel, OfferedHotel, hotelBookingToAdd } = rootStore.hotelStore;
    const { openModal } = rootStore.modalStore;

    
    useEffect(() => {
        loadOfferedHotel(match.params.id);
    }, [match.params.id, loadOfferedHotel])

    hotelBookingToAdd!.productId = match.params.id;



    return (
        <Grid>
            <Grid.Column width={10}>



                {/* Hotel Header */}



                <Segment.Group>
                    <Segment basic attached='top' style={{ padding: '0' }}>
                        <Image src='/assets/placeholder.png' fluid />
                        <Segment basic style={hotelImageTextStyle}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <h1><b>{OfferedHotel?.name}</b></h1>
                                        <p>
                                            <strong>${OfferedHotel?.price} per Night</strong>
                                        </p>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    </Segment>
                    <Segment clearing attached='bottom'>
                        <Button color='orange' onClick={() => openModal(<HotelBooking />)}>Book This Offer</Button>
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
                                <p>{OfferedHotel?.description}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached>
                        <Grid verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='teal' />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <span>{OfferedHotel?.adress}, {OfferedHotel?.city}, {OfferedHotel?.country}</span>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached='top'>
                        <Grid  verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon size='large' color='teal' name='plus' />
                            </Grid.Column>
                            <Grid.Column width={15}>
                                <p>{OfferedHotel?.package}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Segment.Group>





            </Grid.Column>
            <Grid.Column width={6}>
                {/* Hotel Comments */}


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
                                    <Comment.Author as='a'>Sophie</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Yesterday at 10:15AM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Amazing Stay, would love to go again !</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='/assets/user.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Jake Paul</Comment.Author>
                                    <Comment.Metadata>
                                        <div>2 days ago</div>
                                    </Comment.Metadata>
                                    <Comment.Text>So many memories made in this room !</Comment.Text>
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

export default observer(HotelOffer)