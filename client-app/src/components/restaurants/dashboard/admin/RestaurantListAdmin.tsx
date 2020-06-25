import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label } from 'semantic-ui-react';

const RestaurantListAdmin = () => {

    const rootStore = useContext(RootStoreContext);
    const { adminRestaurantList, selectRestaurant, deleteRestaurant, submitting, target, openCreateForm } = rootStore.restaurantStore;

    const [citySearchString, setCitySearchString] = useState('');

    const [countrySearchString, setCountrySearchString] = useState("");

    const [nameSearchString, setNameSearchString] = useState("");

    const handleCountryFilterChange = (event: any) => {
        setCountrySearchString(event.target.value);
    }


    const handleCityFilterChange = (event: any) => {
        setCitySearchString(event.target.value);
    }

    const handleNameFilterChange = (event: any) => {
        setNameSearchString(event.target.value);
    }

    var restaurantsFiltered = adminRestaurantList;


    if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
                && x.name.toLowerCase().match(nameSearchString);
        });
    }
    else if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
        });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString);
        });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.name.toLowerCase().match(nameSearchString) && x.country.toLowerCase().match(countrySearchString);
        });
    }
    else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length === 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.city.toLowerCase().match(citySearchString);
        });
    }
    else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.country.toLowerCase().match(countrySearchString);
        });
    }
    else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
        restaurantsFiltered = restaurantsFiltered.filter((x) => {
            return x.name.toLowerCase().match(nameSearchString);
        });
    }


    useEffect(() => {
        setCitySearchString(citySearchString.trim().toLowerCase());
        setCountrySearchString(countrySearchString.trim().toLowerCase());
        setNameSearchString(nameSearchString.trim().toLowerCase());
    }, [citySearchString, countrySearchString, nameSearchString])


    return (
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='food' />
            <Header.Content>
              Restaurant Rooms List
  
            <Header.Subheader>
                Manage Your Application Restaurant Offers
                    </Header.Subheader>
            </Header.Content>
          </Header>
  
          <Header as='h2' floated='right'>
            <Button
              icon='food'
              onClick={openCreateForm}
              positive
              content="Add A Restaurant"
              style={{ marginBottom: "0.3em" }}
            />
          </Header>
        </Container>
        <Container style={{ marginTop: "5em", marginBottom: "1em" }}>
          <Header as='h3' dividing>
  
  
          </Header>
        </Container >
  
  
  
        <Container style={{ marginTop: "1.5em", marginBottom: "0.7em" }}>
          <Grid width={16}>
            <Grid.Column width={5} >
              <Input type="text" icon='search' fluid
                value={countrySearchString}
                onChange={handleCountryFilterChange}
                placeholder="Search by country ..." />
  
            </Grid.Column>
  
            <Grid.Column width={5}>
              <Input type="text" icon="search" fluid
                value={citySearchString}
                onChange={handleCityFilterChange}
                placeholder="Select by city..." />
  
            </Grid.Column>
  
            <Grid.Column width={5}>
              <Input type="text" icon="search" fluid
                value={nameSearchString}
                onChange={handleNameFilterChange}
                placeholder="Select by name..." />
            </Grid.Column>
          </Grid>
        </Container>
        <Header as='h3' dividing> </Header>
        <Item.Group divided>
          {restaurantsFiltered.map((restaurant) => (
            <Item key={restaurant.id}>
              <Item.Image src="/assets/placeholder.png" size='medium' />
              <Item.Content>
                <Item.Header as="a">{restaurant.name}</Item.Header>
                <Item.Meta>{restaurant.meals}</Item.Meta>
                <Item.Meta>
                  {/* <Flag name={car.country} /> */}
                  {restaurant.city}, {restaurant.country}
                </Item.Meta>
                <Item.Description>
                  <div>{restaurant.description}</div>
                  <div>{restaurant.phoneNumber}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectRestaurant(restaurant.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={restaurant.id}
                    loading={target === restaurant.id && submitting}
                    onClick={(e) => deleteRestaurant(e, restaurant.id)}
                    floated="right"
                    content="Delete"
                    color="red"
  
                  />
                  <Label basic content={restaurant.adress} />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
}

export default observer(RestaurantListAdmin)