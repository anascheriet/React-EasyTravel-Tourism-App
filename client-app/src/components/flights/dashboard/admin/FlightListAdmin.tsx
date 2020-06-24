import React, { useContext, useState, useEffect } from 'react'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Segment, Container, Header, Icon, Button, Grid, Input, Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const FlightListAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { adminFlightsByPrice, selectFlight, deleteFlight, submitting, target, openCreateForm } = rootStore.flightStore;



    const [depDateString, setdepDateString] = useState("");
    const [retDateString, setretDateString] = useState("");
    const [depLocationString, setDepLocationString] = useState("");
    const [destinationString, setDestinationString] = useState("");
    const [typeString, setTypeString] = useState("");

    const handleTypeFilterChange = (event: any) => {
      setTypeString(event.target.value);
    }
    const handleDepDateFilterChange = (event: any) => {
      setdepDateString(event.target.value);
    }
    const handleDepLocationFilterChange = (event: any) => {
      setDepLocationString(event.target.value);
    }
    const handleDestinationFilterChange = (event: any) => {
      setDestinationString(event.target.value);
    }
    const handleRetDateFilterChange = (event: any) => {
      setretDateString(event.target.value);
    }


    useEffect(() => {
      setDepLocationString(depLocationString.toLowerCase());
      setDestinationString(destinationString.toLowerCase());
      setTypeString(typeString.toLowerCase());
      setdepDateString(depDateString.trim());
      setretDateString(retDateString.trim());
    }, [depLocationString, destinationString, typeString, depDateString,retDateString]);




    var flightsFiltered = adminFlightsByPrice;

    if(typeString.length > 0 && depDateString.length > 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.departingCity.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString)  && x.destinationCity.toLowerCase().match(destinationString);
         });
    }
    else if(
      typeString.length > 0 && depDateString.length > 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length === 0
    )
    {
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString) 
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0  && depLocationString.length > 0 &&  retDateString.length === 0 && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && x.combinedDepLocation!.toLowerCase().match(depLocationString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else 
    if(typeString.length > 0 && depDateString.length > 0  && depLocationString.length === 0 &&  retDateString.length> 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString)  && String(x.returningDate).match(retDateString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else 
    if(typeString.length > 0 && depDateString.length === 0  && depLocationString.length > 0 &&  retDateString.length> 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString)  && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length > 0  && depLocationString.length > 0 &&  retDateString.length> 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString)  && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depLocationString.length > 0 &&  retDateString.length === 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.combinedDepLocation!.toLowerCase().match(depLocationString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length > 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString) ;
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  String(x.departingDate).match(depDateString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    } 
    else if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depLocationString.length > 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && x.combinedDepLocation!.toLowerCase().match(depLocationString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length > 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.returningDate).match(retDateString)  && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length > 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString)  && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.combinedDepLocation!.toLowerCase().match(depLocationString) && String(x.returningDate).match(retDateString)  && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length > 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length === 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && String(x.departingDate).match(depDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length === 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString)  && x.combinedDepLocation!.toLowerCase().match(depLocationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length > 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.departingDate).match(depDateString) && String(x.returningDate).match(retDateString);
         });
    }
    else if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.type.toLowerCase().match(typeString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return x.combinedDepLocation!.toLowerCase().match(depLocationString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length > 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString) && x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else
    if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length > 0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString) && x.combinedDepLocation!.toLowerCase().match(depLocationString);
         });
    }
    else if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length === 0  && destinationString.length > 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.combinedDestination!.toLowerCase().match(destinationString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length >  0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return String(x.returningDate).match(retDateString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length === 0 && depLocationString.length > 0 &&  retDateString.length ===  0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.combinedDepLocation!.toLowerCase().match(depLocationString);
         });
    }
    else  if(typeString.length === 0 && depDateString.length > 0 && depLocationString.length === 0 &&  retDateString.length ===  0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  String(x.departingDate).match(depDateString);
         });
    }
    else  if(typeString.length > 0 && depDateString.length === 0 && depLocationString.length === 0 &&  retDateString.length ===  0  && destinationString.length === 0 ){
      flightsFiltered = flightsFiltered.filter((x) => {
        return  x.type.toLowerCase().match(typeString);
         });
    }
   



    

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
          <label><b>Ticket Type:</b></label>
           <select defaultValue={typeString} onChange={handleTypeFilterChange} name="type"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                    <option selected disabled value=""></option>
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
          <Grid width={16} style={{marginTop: "0em"}}>
          <Grid.Column width={5} >
          <label><b>From:</b></label>
              <Input type="text" icon="search" fluid
                  value={depLocationString}
                  onChange={handleDepLocationFilterChange}
                  placeholder="City, Country..." />
    
              </Grid.Column>
              
              <Grid.Column width={5}>
              <label><b>To:</b></label>
                <Input type="text" icon="search" fluid
                  value={destinationString}
                  onChange={handleDestinationFilterChange}
                  placeholder="City, Country..." />
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

                 {flight.type ==="Round Trip" &&
                  <Label basic >Return Flight: Leaves at {flight.returnDepartingTime} of {String(flight.returningDate).split("T")[0]}, arrives at {flight.returnArrivingTime}</Label>}
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    )
}

export default observer(FlightListAdmin)