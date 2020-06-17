import React, { useState, useEffect, useContext, Fragment } from 'react'
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
    const [id, setId] = useState("");
    useEffect(() => {
        setId(match.params.id);
    }, [match.params.id])

    const rootStore = useContext(RootStoreContext);
    const { clientHotelList, hotelBookingToAdd } = rootStore.hotelStore;
    const { openModal } = rootStore.modalStore;
    let hotel = clientHotelList.find(x => x.id === id);

    hotelBookingToAdd!.productid = id;


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
                                        <h1><b>{hotel?.name}</b></h1>
                                        <p>
                                            <strong>{hotel?.package} </strong>
                                        </p>
                                        <p>
                                            Price: <strong>{hotel?.price} $</strong>
                                        </p>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    </Segment>
                    <Segment clearing attached='bottom'>
                        <Button color='orange' onClick={() => openModal(<HotelBooking/>)}>Book This Offer</Button>
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
                                <p>{hotel?.description}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached>
                        <Grid verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='teal' />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <span>{hotel?.city}, {hotel?.country}</span>
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
                                    <Comment.Author as='a'>Matt</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Today at 5:42PM</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Great Car!</Comment.Text>
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
                                    <Comment.Text>I wish i had this car it's so awesome</Comment.Text>
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