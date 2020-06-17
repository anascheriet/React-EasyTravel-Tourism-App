import React, { useEffect, useContext, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid, Segment, Item, Image, Header, Button, Icon, Comment, Form } from 'semantic-ui-react';
import CarBooking from '../../form/CarBooking';



const carImageTextStyle = {
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

const CarOffer: React.FC<RouteComponentProps<offerId>> = ({ match }) => {
    const rootStore = useContext(RootStoreContext);
    const {loadOfferedCar, OfferedCar, carBookingToAdd } = rootStore.carStore;
    const { openModal } = rootStore.modalStore;

 
    useEffect(() => {
        
        loadOfferedCar(match.params.id);
    }, [match.params.id,loadOfferedCar])

    carBookingToAdd!.productid = match.params.id;
    
    return (
        <Grid>
            <Grid.Column width={10}>



                {/* Car Header */}



                <Segment.Group>
                    <Segment basic attached='top' style={{ padding: '0' }}>
                        <Image src={`/assets/carImages/${OfferedCar?.name}.jpg`} fluid />
                        <Segment basic style={carImageTextStyle}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <h1><b>{OfferedCar?.name}</b></h1>
                                        <p>
                                            <strong>{OfferedCar?.options} </strong>
                                        </p>
                                        <p>
                                            Price: <strong>{OfferedCar?.price} $</strong>
                                        </p>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Segment>
                    </Segment>
                    <Segment clearing attached='bottom'>
                        <Button color='orange' onClick={() => openModal(<CarBooking/>)}>Book This Car</Button>
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
                                <p>{OfferedCar?.description}</p>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <Segment attached>
                        <Grid verticalAlign='middle'>
                            <Grid.Column width={1}>
                                <Icon name='marker' size='large' color='teal' />
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <span>{OfferedCar?.city}, {OfferedCar?.country}</span>
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

export default observer(CarOffer);


