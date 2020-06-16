import React, { useContext, useState, useEffect } from "react";
import { Button, Item, Label, Segment, Input, Grid, Header, Icon, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../../app/stores/rootStore";

const CarListAdmin: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { adminCarsByPrice, selectCar, deleteCar, submitting, target, openCreateForm } = rootStore.carStore;

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

  var carsFiltered = adminCarsByPrice;

  useEffect(() => {
    setCitySearchString(citySearchString.trim().toLowerCase());
    setCountrySearchString(countrySearchString.trim().toLowerCase());
    setNameSearchString(nameSearchString.trim().toLowerCase());
  }, [citySearchString, countrySearchString, nameSearchString])


  if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString)
        && x.name.toLowerCase().match(nameSearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString) && x.name.toLowerCase().match(nameSearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length > 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.name.toLowerCase().match(nameSearchString) && x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length > 0 && countrySearchString.length === 0 && nameSearchString.length === 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.city.toLowerCase().match(citySearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length > 0 && nameSearchString.length === 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.country.toLowerCase().match(countrySearchString);
    });
  }
  else if (citySearchString.length === 0 && countrySearchString.length === 0 && nameSearchString.length > 0) {
    carsFiltered = carsFiltered.filter((x) => {
      return x.name.toLowerCase().match(nameSearchString);
    });
  }



  return (

    <Segment clearing>
      <Container clearing  >
        <Header as='h2' floated="left">
          <Icon name='car' />
          <Header.Content>
            Cars List

          <Header.Subheader>
              Manage Your Application Cars
                  </Header.Subheader>
          </Header.Content>
        </Header>
    
        <Header as='h2' floated='right'>
          <Button
            icon='car'
            onClick={openCreateForm}
            positive
            content="Add Car"
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
        {carsFiltered.map((car) => (
          <Item key={car.id}>
            <Item.Content>
              <Item.Header as="a">{car.name}</Item.Header>
              <Item.Meta>{car.price}$ per day</Item.Meta>
              <Item.Meta>
                {/* <Flag name={car.country} /> */}
                {car.city}, {car.country}
              </Item.Meta>
              <Item.Description>
                <div>{car.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectCar(car.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name={car.id}
                  loading={target === car.id && submitting}
                  onClick={(e) => deleteCar(e, car.id)}
                  floated="right"
                  content="Delete"
                  color="red"

                />
                <Label basic content={car.options} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(CarListAdmin)