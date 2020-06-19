import React, { useContext } from 'react'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const FlightListAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { adminFlightsByPrice, selectFlight, deleteFlight, submitting, target, openCreateForm } = rootStore.flightStore;
    return (
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='plane' />
            <Header.Content>
             Flight Tickets List
  
            <Header.Subheader>
                Manage Your Application Flight Tickets Offers
                    </Header.Subheader>
            </Header.Content>
          </Header>
  
          <Header as='h2' floated='right'>
            <Button
              icon='plane'
              onClick={openCreateForm}
              positive
              content="Add A Flight Ticket"
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
                value=""
                // onChange={}
                placeholder="Departing Date ..." />
  
            </Grid.Column>
  
            <Grid.Column width={5}>
              <Input type="text" icon="search" fluid
                // value={citySearchString}
                // onChange={handleCityFilterChange}
                placeholder="Arriving Date..." />
  
            </Grid.Column>
  
            <Grid.Column width={5}>
              <Input type="text" icon="search" fluid
                // value={nameSearchString}
                // onChange={handleNameFilterChange}
                placeholder="Departing City..." />
            </Grid.Column>
          </Grid>
        </Container>
        <Header as='h3' dividing> </Header>
        <Item.Group divided>
          {adminFlightsByPrice.map((flight) => (
            <Item key={flight.id}>
              <Item.Image src="/assets/placeholder.png" size='medium' />
              <Item.Content>
                <Item.Header as="a">{flight.name}</Item.Header>
                <Item.Description>
                  {flight.type} 
                </Item.Description>
                <Item.Meta>{flight.price}$ per person</Item.Meta>
                <Item.Meta>
                  
              From {flight.departingCity}, {flight.departingCountry} <br/>
              To {flight.destinationCity}, {flight.destinationCountry}
                </Item.Meta>
               
                <Item.Extra>
                  <Button
                    onClick={() => selectFlight(flight.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={flight.id}
                    loading={target === flight.id && submitting}
                    onClick={(e) => deleteFlight(e, flight.id)}
                    floated="right"
                    content="Delete"
                    color="red"
  
                  />
                  {/* <Label basic content={flight.deptime} /> */}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
}

export default observer(FlightListAdmin)