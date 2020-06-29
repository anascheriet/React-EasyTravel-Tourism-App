import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import { Card, Icon, Image, GridColumn, Segment, Grid, Header, Container, Button, List } from 'semantic-ui-react';
import RestaurantDashBoardAdmin from '../restaurants/dashboard/admin/RestaurantDashBoardAdmin';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { clientRestaurantList, loadAllRestaurants, emptyAllRestaurants } = rootStore.restaurantStore;
    const { clientHotelsByPrice, loadAllHotels, emptyAllHotels } = rootStore.hotelStore;
    const { ClientActivitiesByPrice, loadAllActivities, emptyAllActivities } = rootStore.activityStore;
    const { allArticleList, loadAllArticles, emptyAllArticles } = rootStore.articleStore;

    useEffect(() => {
        loadAllRestaurants();
        loadAllHotels();
        loadAllActivities();
        loadAllArticles();
        emptyAllRestaurants();
        emptyAllHotels();
        emptyAllActivities();
        emptyAllArticles();
    }, [loadAllRestaurants,loadAllHotels,loadAllActivities,emptyAllRestaurants,emptyAllHotels,emptyAllActivities,emptyAllArticles])

    return (
        <Grid>
             <Grid.Column width={16}>

             <Segment clearing> 
        <Container clearing  >
        <Button floated="right" as={Link} to={'activities/'} color="orange" >
            Discover More <Icon name="chevron right" />
        </Button>    
        <Header as='h2' dividing floated="left">
            <Icon name='ticket' />
            <Header.Content>
              Activities
  
            <Header.Subheader>
               Discover Our Collection Of Actvities !
               
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{marginTop:"5em"}}>
            <Card.Group>
        {ClientActivitiesByPrice.slice(0,3).map((activity) => {
                        return (
                            <Card>
                                <Image fluid src={`/assets/activityImages/${activity?.name}.jpg`} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{activity.name}</Card.Header>
                                    <Card.Meta>
                                        ${activity.price}
                                    </Card.Meta>
                                    <Card.Description>
                                        {activity.description.slice(0,100)}...
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
        <Button content="View" icon='eye' fluid as={Link} to={`/activities/${activity.id}`} />
      </Card.Content>
                            </Card>
                        )
                    })}
                    </Card.Group>
        </Container>
                        {/* /*
                          */}
                </Segment>



             {/* Hotels */}
             <Segment clearing> 
        <Container clearing  >
        <Button floated="right" as={Link} to={'hotels/'} color="orange" >
            Discover More <Icon name="chevron right" />
        </Button>    
        <Header as='h2' dividing floated="left">
            <Icon name='hotel' />
            <Header.Content>
              Hotels
  
            <Header.Subheader>
               Discover Our Collection Of Hotel Stay Offers !
               
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{marginTop:"5em"}}>
            <Card.Group>
        {clientHotelsByPrice.slice(0,3).map((hotel) => {
                        return (
                            <Card>
                                <Image fluid src="/assets/placeholder.png" wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{hotel.name}</Card.Header>
                                    <Card.Meta>
                                        ${hotel.price}
                                    </Card.Meta>
                                    <Card.Description>
                                        {hotel.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
        <Button content="View" icon='eye' fluid as={Link} to={`/hotels/${hotel.id}`} />
      </Card.Content>
                            </Card>
                        )
                    })}
                    </Card.Group>
        </Container>
                        {/* /*
                          */}
                </Segment>



                 {/* Cars */}
        <Segment clearing> 
        <Container clearing  >
        <Button floated="right" as={Link} to={'restaurants/'} color="orange" >
            Discover More <Icon name="chevron right" />
        </Button>    
        <Header as='h2' dividing floated="left">
            <Icon name='food' />
            <Header.Content>
              Restaurants
  
            <Header.Subheader>
               Discover a Wonderful Mix of Cuisines !
               
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{marginTop:"5em"}}>
            <Card.Group>
        {clientRestaurantList.slice(0,3).map((resto) => {
                        return (
                            <Card>
                                <Image fluid src={`/assets/mealImages/${resto?.name}.jpg`} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{resto.name}</Card.Header>
                                    <Card.Meta>
                                        ${resto.meals}
                                    </Card.Meta>
                                    <Card.Description>
                                        {resto.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
        <Button content="View" icon='eye' fluid as={Link} to={`/restaurants/${resto.id}`} />
      </Card.Content>
                            </Card>
                        )
                    })}
                    </Card.Group>
        </Container>
                    
                </Segment>



                   {/* Articles */}
             <Segment clearing> 
        <Container clearing >
        <Header as='h2' dividing floated="left">
            <Icon name='quote right' />
            <Header.Content>
              Articles
  
            <Header.Subheader>
               Read And Discover People's Experiences !
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{marginTop:"5em"}}>
            <Card.Group>
        {allArticleList.slice(0,3).map((article) => {
                        return (
                            <Card>
                                <Image fluid src="/assets/placeholder.png" wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{article.name}</Card.Header>
                                    <Card.Meta>
                                        ${article.body.slice(0,100)}...
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
        <Button content="Full Article" icon='eye' fluid as={Link} to={`/articles/${article.id}`} />
      </Card.Content>
                            </Card>
                        )
                    })}
                    </Card.Group>
        </Container>
                        {/* /*
                          */}
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(HomePage);
