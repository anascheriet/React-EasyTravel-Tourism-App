import React, { useContext, useEffect, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Grid, Segment, Item, Icon, Header, Form, Button, Image, Comment } from 'semantic-ui-react';

interface offerId {
    id: string;
}

const FullArticle: React.FC<RouteComponentProps<offerId>>= ({
    match
}) => {
    const rootStore = useContext(RootStoreContext);
    const {loadFullCar, FullArticle } = rootStore.articleStore;
    const { openModal } = rootStore.modalStore;
    const {user} = rootStore.userStore;

    useEffect(() => {
        loadFullCar(match.params.id);
    }, [match.params.id,loadFullCar])


    return (
        <Grid>
        <Grid.Column width={10}>
            {/* Car Header */}
            <Segment.Group>
                <Segment basic attached='top' style={{ padding: '0' }}>
                    <Image src='/assets/placeholder.png' fluid />
                    <Segment basic >
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <h1><b>{FullArticle?.name}</b></h1>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
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
                            <p>{FullArticle?.body}</p>
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

export default observer(FullArticle);
