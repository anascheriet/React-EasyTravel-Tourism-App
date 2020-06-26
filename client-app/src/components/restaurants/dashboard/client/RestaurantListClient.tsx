import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid, Segment, Container, Header, Icon, Item, Button, Label, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RestaurantListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { clientRestaurantList } = rootStore.restaurantStore;

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

    var restaurantsFiltered = clientRestaurantList;


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
        <Grid>
        <Grid.Column width={10}>
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='food' />
            <Header.Content>
              Restaurant Offers
  
            <Header.Subheader>
                Search and Book an offer of your choice !
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{ marginTop: "5em", marginBottom: "1em" }}>
          <Header as='h3' dividing>
          </Header>
        </Container >
  
        
        <Item.Group divided>
          {restaurantsFiltered.map((restaurant) => (
            <Item key={restaurant.id}>
              <Item.Image size='small' src={`/assets/mealImages/${restaurant?.name}.jpg`} />
              <Item.Content>
              <Item.Header as="a">{restaurant.name}</Item.Header>
              <Item.Meta>{restaurant.meals}</Item.Meta>
              <Item.Meta>
                  <Icon color='teal' name="marker"/>
               {restaurant.adress}, {restaurant.city}, {restaurant.country}
              </Item.Meta>
              <Item.Description>
                <div>{restaurant.description}</div>
                <div>{restaurant!.phoneNumber} </div>

              </Item.Description>
              <Item.Extra>
                <Button
                as={Link} to={`/restaurants/${restaurant.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
         </Item.Group>
      </Segment>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment clearing >
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='filter' />
            <Header.Content>
              Filters
  
            <Header.Subheader>
                Filter by Country, City or Restaurant Name !
                    </Header.Subheader>
            </Header.Content>
          </Header>
           
        </Container>
        <Container style={{ marginTop: "5.5em" }}>
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
  
  <br/>
              <Input type="text" icon="search" fluid
                value={nameSearchString}
                onChange={handleNameFilterChange}
                placeholder="Filter by number of rooms..." />
            
        </Container>
        </Segment>

      </Grid.Column>
      </Grid>
    )
}


export default observer(RestaurantListClient)