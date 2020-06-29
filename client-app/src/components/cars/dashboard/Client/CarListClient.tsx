import React, { useContext, useState, useEffect } from "react";
import { Button, Item, Label, Segment, Input, Grid, Header, Icon, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { Link } from "react-router-dom";

export const CarListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { ClientCarsByPrice } = rootStore.carStore;
    const {user} = rootStore.userStore;
  
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
  
    var carsFiltered = ClientCarsByPrice;
  
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
      <Grid>
      <Grid.Column width={10}>
      <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='car' />
            <Header.Content>
              Cars
  
            <Header.Subheader>
                Search and Book a car of your choice !
                    </Header.Subheader>
            </Header.Content>
          </Header>
      
          
        </Container>
        <Container style={{ marginTop: "5em", marginBottom: "1em" }}>
          <Header as='h3' dividing>
          </Header>
        </Container >

        <Item.Group divided>
          {carsFiltered.map((car) => (
            <Item key={car.id}>
              <Item.Image size='small' src={`/assets/carImages/${car?.name}.jpg`} />
              <Item.Content>
                <Item.Header as="a">{car.name}</Item.Header>
                <Item.Meta>{car.price}$</Item.Meta>
                <Item.Meta>
                  <Icon name="marker"/>
                  {car.city}, {car.country}
                </Item.Meta>
                <Item.Description>
                  <div>{car.description}</div>
                </Item.Description>
                <Item.Extra>
                
                  <Button
                   as={Link} to={`/cars/${car.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  >
                    
                  </Button>
                  <Label basic content={car.options} />
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
                Filter by Country, City or Car Name !
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
            
        </Container>
        </Segment>
        </Grid.Column>
        </Grid>
    );
  };
  
  export default observer(CarListClient)
