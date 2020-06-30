import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore'
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label, Image } from 'semantic-ui-react';

const HotelListAdmin: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const { adminHotelsByPrice, selectHotel, deleteHotel, submitting, target, openCreateForm } = rootStore.hotelStore;


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

  var hotelsFiltered = adminHotelsByPrice;


  if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
        && x.name.toLowerCase().match(nameSearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.name.toLowerCase().match(nameSearchString) && x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length === 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
      return x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
    hotelsFiltered = hotelsFiltered.filter((x) => {
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
          <Icon name='hotel' />
          <Header.Content>
            Hotel Rooms List

          <Header.Subheader>
              Manage Your Application Hotel Offers
                  </Header.Subheader>
          </Header.Content>
        </Header>

        <Header as='h2' floated='right'>
          <Button
            icon='hotel'
            onClick={openCreateForm}
            positive
            content="Add A Hotel Stay Offer"
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
        {hotelsFiltered.map((hotel) => (
          <Item key={hotel.id}>
            <Image fluid src={`/assets/HotelImages/${hotel!.name}.jpg`} wrapped ui={false} size="medium" />
            <Item.Content>
              <Item.Header as="a">{hotel.name}</Item.Header>
              <Item.Meta>{hotel.price}$ per day</Item.Meta>
              <Item.Meta>
                {/* <Flag name={car.country} /> */}
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
                  onClick={() => selectHotel(hotel.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={hotel.id}
                  loading={target === hotel.id && submitting}
                  onClick={(e) => deleteHotel(e, hotel.id)}
                  floated="right"
                  content="Delete"
                  color="red"

                />
                <Label basic content={hotel.adress} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default observer(HotelListAdmin)