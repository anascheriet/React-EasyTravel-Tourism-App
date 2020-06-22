import React, { useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Grid, Segment, Container, Header, Icon, Item, Label, Button, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const ActivityListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { ClientActivitiesByPrice } = rootStore.activityStore;


    const [citySearchString, setCitySearchString] = useState('');

    const [countrySearchString, setCountrySearchString] = useState("");

    const handleCountryFilterChange = (event: any) => {
        setCountrySearchString(event.target.value);
    }


    const handleCityFilterChange = (event: any) => {
        setCitySearchString(event.target.value);
    }

    var activitiesFilter = ClientActivitiesByPrice;

    useEffect(() => {
        setCitySearchString(citySearchString.trim().toLowerCase());
        setCountrySearchString(countrySearchString.trim().toLowerCase());
    }, [citySearchString, countrySearchString])

    if (citySearchString.length > 0 && countrySearchString.length > 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
        });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.city.toLowerCase().match(citySearchString);
        });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0) {
        activitiesFilter = activitiesFilter.filter((x) => {
            return x.country.toLowerCase().match(countrySearchString);
        });
    }

    return (
        <Grid>
        <Grid.Column width={10}>
        <Segment clearing>
          <Container clearing  >
            <Header as='h2' floated="left">
              <Icon name='ticket' />
              <Header.Content>
                Activities
    
              <Header.Subheader>
                  Search and Book an Activity of your choice !
                      </Header.Subheader>
              </Header.Content>
            </Header>
        
            
          </Container>
          <Container style={{ marginTop: "5em", marginBottom: "1em" }}>
            <Header as='h3' dividing>
            </Header>
          </Container >
  
          <Item.Group divided>
            {activitiesFilter.map((activity) => (
              <Item key={activity.id}>
                <Item.Image size='small' src={`/assets/activityImages/${activity?.name}.jpg`} />
                <Item.Content>
                  <Item.Header as="a">{activity.name}</Item.Header>
                  <Item.Meta>{activity.price}$</Item.Meta>
                  <Item.Meta>
                    <Icon name="marker"/>
                    {activity.city}, {activity.country}
                  </Item.Meta>
                  <Item.Description>
                    <div>{activity.description}</div>
                  </Item.Description>
                  <Item.Extra>
                  
                    <Button
                     as={Link} to={`/activities/${activity.id}`}
                      floated="right"
                      content="View"
                      color="blue"
                    >
                      
                    </Button>
                    {/* <Label basic content={activity.options} /> */}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment clearing>
            <Container clearing >
            <Header as="h2" floated="left">
              <Icon name='filter' />
              <Header.Content>
                Filters
  
                <Header.Subheader>
                  Filter Activities by Countries And/Or Cities!
                  </Header.Subheader>
  
                </Header.Content>
                </Header>
                </Container>
                <Container style={{ marginTop: "5em" }}>
            <Header as='h3' dividing>
            </Header>
          </Container >
                <Container >
           <br/>
                <Input type="text" icon='search' fluid
                  value={countrySearchString}
                  onChange={handleCountryFilterChange}
                  placeholder="Filter by country ..." />
    
             
    
              <br/>
                <Input type="text" icon="search" fluid
                  value={citySearchString}
                  onChange={handleCityFilterChange}
                  placeholder="Filter by city..." />
              
          </Container>
          </Segment>
          </Grid.Column>
          </Grid>
    )
}

export default observer(ActivityListClient)
