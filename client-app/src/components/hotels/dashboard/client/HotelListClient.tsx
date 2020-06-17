import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import HotelListAdmin from '../admin/HotelListAdmin'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Grid, Input, Item, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HotelListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { clientHotelsByPrice } = rootStore.hotelStore;

    const [citySearchString, setCitySearchString] = useState('');
  
    const [countrySearchString, setCountrySearchString] = useState("");
  
    const [roomsSearchString, setRoomsSearchString] = useState("");
  
    const handleCountryFilterChange = (event: any) => {
      setCountrySearchString(event.target.value);
    }
  
  
    const handleCityFilterChange = (event: any) => {
      setCitySearchString(event.target.value);
    }
  
    const handleNameFilterChange = (event: any) => {
        setRoomsSearchString(event.target.value);
    }

    var hotelsFiltered = clientHotelsByPrice;

    useEffect(() => {
        setCitySearchString(citySearchString.trim().toLowerCase());
        setCountrySearchString(countrySearchString.trim().toLowerCase());
        setRoomsSearchString(roomsSearchString.trim().toLowerCase());
      }, [citySearchString, countrySearchString, roomsSearchString])

      if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
            && x.name.toLowerCase().match(roomsSearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(roomsSearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.name.toLowerCase().match(roomsSearchString) && x.country.toLowerCase().match(countrySearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.country.toLowerCase().match(countrySearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length === 0 && roomsSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.name.toLowerCase().match(roomsSearchString);
        });
      }
    
    

    return (
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='car' />
            <Header.Content>
              Hotel Stay Deals
  
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
                value={roomsSearchString}
                onChange={handleNameFilterChange}
                placeholder="Select by name..." />
            </Grid.Column>
          </Grid>
        </Container>
        <Header as='h3' dividing> </Header>
        <Item.Group divided>
          {hotelsFiltered.map((hotel) => (
            <Item key={hotel.id}>
              <Item.Image size='small' src='/assets/placeholder.png' />
              <Item.Content>
              <Item.Header as="a">{hotel.name}</Item.Header>
              <Item.Meta>{hotel.price}$ per day</Item.Meta>
              <Item.Meta>
                {hotel.city}, {hotel.country}
              </Item.Meta>
              <Item.Description>
                <div>{hotel.description}</div>
                <div>{hotel!.package} Available</div>
                <div >{hotel!.rooms} Rooms</div>
                {hotel!.people} People
              </Item.Description>
              <Item.Extra>
                <Button
                as={Link} to={`/hotels/${hotel.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Label basic content={hotel.adress} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
         </Item.Group>
      </Segment>
    );
};
export default observer(HotelListClient)