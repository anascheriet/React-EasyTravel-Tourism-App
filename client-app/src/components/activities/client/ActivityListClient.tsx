import React, { useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Grid, Segment, Container, Header, Icon, Item, Button, Input, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const ActivityListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { ClientActivitiesByPrice } = rootStore.activityStore;
    const {user} = rootStore.userStore;


    const [citySearchString, setCitySearchString] = useState('');
  
    const [countrySearchString, setCountrySearchString] = useState("");
  
    const [nameSearchString, setNameSearchString] = useState("");
    const [adminNameSearchString, setAdminNameSearchString] = useState("");

    const handleCountryFilterChange = (event: any) => {
      setCountrySearchString(event.target.value);
    }
  
  
    const handleCityFilterChange = (event: any) => {
      setCitySearchString(event.target.value);
    }
  
    const handleNameFilterChange = (event: any) => {
      setNameSearchString(event.target.value);
    }

    const handleAdminNameFilterChange = (event: any) => {
      setAdminNameSearchString(event.target.value);
    }

    var activitiesFilter = ClientActivitiesByPrice;

    useEffect(() => {
      setCitySearchString(citySearchString.toLowerCase());
      setCountrySearchString(countrySearchString.toLowerCase());
      setNameSearchString(nameSearchString.toLowerCase());
      setAdminNameSearchString(adminNameSearchString.toLowerCase());
    }, [citySearchString, countrySearchString, nameSearchString])

    
    if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length > 0 && adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
          && x.name.toLowerCase().match(nameSearchString) && x.creatorName.toLowerCase().match(adminNameSearchString);
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length > 0 && adminNameSearchString.length > 0 && nameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString) && x.creatorName.toLowerCase().match(adminNameSearchString);
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && adminNameSearchString.length > 0 && nameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString) && x.creatorName.toLowerCase().match(adminNameSearchString);
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length > 0 && adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.name.toLowerCase().match(nameSearchString) && x.country.toLowerCase().match(countrySearchString) && x.creatorName.toLowerCase().match(adminNameSearchString);
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length > 0 && adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString) && x.country.toLowerCase().match(countrySearchString) 
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length === 0 && adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length > 0 && adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString)
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length === 0 && adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString) && x.creatorName.toLowerCase().match(adminNameSearchString)
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length > 0 && adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.country.toLowerCase().match(countrySearchString) && x.name.toLowerCase().match(nameSearchString)
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length === 0 && adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.country.toLowerCase().match(countrySearchString) && x.creatorName.toLowerCase().match(adminNameSearchString)
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length > 0 && adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.name.toLowerCase().match(nameSearchString) && x.creatorName.toLowerCase().match(adminNameSearchString)
      });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length === 0 &&adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.city.toLowerCase().match(citySearchString);
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length === 0 &&adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.country.toLowerCase().match(countrySearchString);
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length > 0 &&adminNameSearchString.length === 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.name.toLowerCase().match(nameSearchString);
      });
    }
    else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length === 0 &&adminNameSearchString.length > 0) {
      activitiesFilter = activitiesFilter.filter((x) => {
        return x.creatorName.toLowerCase().match(adminNameSearchString);
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
                  {user?.status==="SudoAdmin" &&<Item.Extra>
                <Label color="teal"> Created By: {activity.creatorName}</Label>
                </Item.Extra>}
                  <Item.Meta>{activity.price}$</Item.Meta>
                  <Item.Meta>
                    <Icon name="marker" color='teal'/>
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
                placeholder="Search by country ..." />
  
           
  
            <br/>
              <Input type="text" icon="search" fluid
                value={citySearchString}
                onChange={handleCityFilterChange}
                placeholder="Select by city..." />
  
            <br/>
              <Input type="text" icon="search" fluid
                value={nameSearchString}
                onChange={handleNameFilterChange}
                placeholder="Select by name..." />
             <br/>
              {user?.status==="SudoAdmin" &&
                <Input type="text" icon="search" fluid
                value={adminNameSearchString}
                onChange={handleAdminNameFilterChange}
                placeholder="Filter By Admin..." />
              }
            
        </Container>
          </Segment>
          </Grid.Column>
          </Grid>
    )
}

export default observer(ActivityListClient)
