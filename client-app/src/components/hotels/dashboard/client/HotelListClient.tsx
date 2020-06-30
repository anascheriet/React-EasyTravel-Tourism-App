import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Grid, Input, Item, Button, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HotelListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { clientHotelsByPrice } = rootStore.hotelStore;
    const {user} = rootStore.userStore;

    const [citySearchString, setCitySearchString] = useState('');
  
    const [countrySearchString, setCountrySearchString] = useState("");
  
    const [roomsSearchString, setRoomsSearchString] = useState("");
    const [adminNameSearchString, setAdminNameSearchString] = useState("");
  
  
    const handleCountryFilterChange = (event: any) => {
      setCountrySearchString(event.target.value);
    }
  
  
    const handleCityFilterChange = (event: any) => {
      setCitySearchString(event.target.value);
    }
  
    const handleRoomsFilterChange = (event: any) => {
        setRoomsSearchString(event.target.value);
    }
    const handleAdminNameFilterChange = (event: any) => {
      setAdminNameSearchString(event.target.value);
    }

    var hotelsFiltered = clientHotelsByPrice;

    useEffect(() => {
        setCitySearchString(citySearchString.trim().toLowerCase());
        setCountrySearchString(countrySearchString.trim().toLowerCase());
        setRoomsSearchString(roomsSearchString.trim().toLowerCase());
        setAdminNameSearchString(adminNameSearchString.toLowerCase());
      }, [citySearchString, countrySearchString, roomsSearchString,adminNameSearchString])

      if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length > 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
            && String(x.rooms).match(roomsSearchString) && x.creatorName!.toLowerCase().match(adminNameSearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length > 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString) && String(x.rooms).match(roomsSearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length > 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && String(x.rooms).match(roomsSearchString) &&  x.creatorName!.toLowerCase().match(adminNameSearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length > 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return String(x.rooms).match(roomsSearchString) && x.country.toLowerCase().match(countrySearchString) &&  x.creatorName!.toLowerCase().match(adminNameSearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length === 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString) &&  x.creatorName!.toLowerCase().match(adminNameSearchString);
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length > 0 && roomsSearchString.length === 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length > 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.rooms.toLowerCase().match(roomsSearchString)
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length === 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString) && x.creatorName!.toLowerCase().match(adminNameSearchString)
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length > 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.country.toLowerCase().match(countrySearchString) && x.rooms.toLowerCase().match(roomsSearchString)
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length === 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.country.toLowerCase().match(countrySearchString) && x.creatorName!.toLowerCase().match(adminNameSearchString)
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length === 0 && roomsSearchString.length > 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.rooms.toLowerCase().match(roomsSearchString) && x.creatorName!.toLowerCase().match(adminNameSearchString)
        });
      }
      else if (citySearchString.length > 0 && countrySearchString.length === 0 && roomsSearchString.length === 0  && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.city.toLowerCase().match(citySearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length > 0 && roomsSearchString.length === 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.country.toLowerCase().match(countrySearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length === 0 && roomsSearchString.length > 0 && adminNameSearchString.length === 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return String(x.rooms).match(roomsSearchString);
        });
      }
      else if (citySearchString.length === 0 && countrySearchString.length === 0 && roomsSearchString.length === 0 && adminNameSearchString.length > 0) {
        hotelsFiltered = hotelsFiltered.filter((x) => {
          return x.creatorName!.match(adminNameSearchString);
        });
      }
    
      console.log(clientHotelsByPrice.length)
    

    return (
      <Grid>
        <Grid.Column width={10}>
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='hotel' />
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
  
        
        <Item.Group divided>
          {hotelsFiltered.map((hotel) => (
            <Item key={hotel.id}>
              <Image fluid src={`/assets/HotelImages/${hotel?.name}.jpg`} wrapped ui={false} />
              <Item.Content>
              <Item.Header as="a">{hotel.name}</Item.Header>
              {user?.status==="SudoAdmin" &&<Item.Extra>
                <Label color="teal"> Created By: {hotel.creatorName}</Label>
                </Item.Extra>}
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
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment clearing >
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='filter' />
            <Header.Content>
              Filters
  
            <Header.Subheader>
                Filter by Country, City or Number of Rooms per Deal !
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
                value={roomsSearchString}
                onChange={handleRoomsFilterChange}
                placeholder="Filter by number of rooms..." />
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
    );
};
export default observer(HotelListClient)