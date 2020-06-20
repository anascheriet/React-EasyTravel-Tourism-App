import React, { useContext, useState, useEffect } from 'react'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label, Dropdown, Form } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const FlightListAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { adminFlightsByPrice, selectFlight, deleteFlight, submitting, target, openCreateForm } = rootStore.flightStore;



    const [depDateString, setdepDateString] = useState("");
    const [retDateString, setretDateString] = useState("");
    const [depCityString, setDepCityString] = useState("");
    const [retCityString, setRetCityString] = useState("");
    const [typeString, setTypeString] = useState("");

    const handleTypeFilterChange = (event: any) => {
      setTypeString(event.target.value);
    }
    const handleDepDateFilterChange = (event: any) => {
      setdepDateString(event.target.value);
    }
    const handleDepCityFilterChange = (event: any) => {
      setDepCityString(event.target.value);
    }
    const handleRetCityFilterChange = (event: any) => {
      setRetCityString(event.target.value);
    }
    const handleRetDateFilterChange = (event: any) => {
      setretDateString(event.target.value);
    }


    useEffect(() => {
      setDepCityString(depCityString.trim().toLowerCase());
      setRetCityString(retCityString.trim().toLowerCase());
      setTypeString(typeString.toLowerCase());
      setdepDateString(depDateString.trim());
      setretDateString(retDateString.trim());
    }, [depCityString, retCityString, typeString, depDateString,retDateString]);




    var flightsFiltered = adminFlightsByPrice;

    if(typeString.length > 0 && depDateString.length > 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(
      typeString.length > 0 && depDateString.length > 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length === 0
    )
    {
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString) 
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0  && depCityString.length > 0 &&  retDateString.length === 0 && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && x.departingCity.toLowerCase().match(depCityString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else 
    if(typeString.length > 0 && depDateString.length > 0  && depCityString.length === 0 &&  retDateString.length> 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && String(x.returningDate).match(retDateString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else 
    if(typeString.length > 0 && depDateString.length === 0  && depCityString.length > 0 &&  retDateString.length> 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length > 0  && depCityString.length > 0 &&  retDateString.length> 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depCityString.length > 0 &&  retDateString.length === 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depCityString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length > 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString) ;
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    } 
    else if(typeString.length > 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.departingCity.toLowerCase().match(depCityString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depCityString.length > 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depCityString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length > 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length > 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.departingCity.toLowerCase().match(depCityString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length === 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length === 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString)  && x.departingCity.toLowerCase().match(depCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length > 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.departingCity.toLowerCase().match(depCityString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length > 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString) && x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length > 0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString) && x.departingCity.toLowerCase().match(depCityString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length === 0  && retCityString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.destinationCity.toLowerCase().match(retCityString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length >  0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length === 0 && depCityString.length > 0 &&  retDateString.length ===  0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.departingCity.toLowerCase().match(depCityString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length > 0 && depCityString.length === 0 &&  retDateString.length ===  0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  String(x.departingDate).match(depDateString);
         });
    }
    else  if(typeString.length > 0 && depDateString.length === 0 && depCityString.length === 0 &&  retDateString.length ===  0  && retCityString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.type.toLowerCase().match(typeString);
         });
    }
   
   

const typeOptions = [{
  key: 'OWT',
  text: 'One Way Trip',
  value: 'Jenny Hess',
},
{
  key: 'RT',
  text: 'Round Trip',
  value: 'Round Trip',
}]


    

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
           <select defaultValue={typeString} onChange={handleTypeFilterChange} name="type"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                    <option selected disabled value="">Ticket Type</option>
                    <option key="OWT" value="One Way Ticket">One Way Ticket</option>
                    <option key="RT" value="Round Trip">Round Trip</option>

                </select>
         </Grid.Column>
            <Grid.Column width={5} >
              <label><b>Departure Date:</b></label>
              <Input type="date" fluid
                value={depDateString}
                onChange={handleDepDateFilterChange}
                />
            </Grid.Column>
            <Grid.Column width={5} >
            {typeString === "round trip" &&
            <div>
            <label><b>Return Date:</b></label>
            <Input type="date" fluid
                value={retDateString}
                onChange={handleRetDateFilterChange}
             />
                </div>
            }
   </Grid.Column>
          </Grid>
          <Grid width={16}>
          <Grid.Column width={5} >
              
              <Input type="text" icon="search" fluid
                  value={depCityString}
                  onChange={handleDepCityFilterChange}
                  placeholder="Departing City..." />
    
              </Grid.Column>
              
              <Grid.Column width={5}>
                <Input type="text" icon="search" fluid
                  value={retCityString}
                  onChange={handleRetCityFilterChange}
                  placeholder="Destination City..." />
              </Grid.Column>
              <Grid.Column width={5} >
              
            </Grid.Column>

          </Grid>
        </Container>
        <Header as='h3' dividing> </Header>
        <Item.Group divided>
          {flightsFiltered.map((flight) => (
  
            <Item key={flight.id}>
              {/* <Item.Image src="/assets/placeholder.png" size='medium' /> */}
              <Item.Content>
                <Item.Header as="a">{flight.name}</Item.Header>
                <Item.Description>
                  {flight.type} 
                </Item.Description>
                <Item.Meta>{flight.price}$ per person</Item.Meta>
                <Item.Meta>
                  
              Leaves {flight.departingCity}, {flight.departingCountry} at {flight.departingDepartingTime} of {String(flight.departingDate).split("T")[0]} <br/>
              Arrives To {flight.destinationCity}, {flight.destinationCountry} on {flight.departingArrivingTime}
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
                  <Label basic >Return Flight: Leaves at {flight.returnDepartingTime} of {String(flight.returningDate).split("T")[0]}, arrives at {flight.returnArrivingTime}</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
}

export default observer(FlightListAdmin)