import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid, Segment, Container, Header, Label, Button, Item, Icon, Input } from 'semantic-ui-react';
import FlightBooking from '../../form/FlightBooking';

const FlightListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const { clientFlightsByPrice, flightBookingToAdd } = rootStore.flightStore;
    const { openModal } = rootStore.modalStore;

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




    var flightsFiltered = clientFlightsByPrice;

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

    const setproductId = (id: string) => {
      flightBookingToAdd!.productId = id;
    }
   

    return (
        <Grid>
        <Grid.Column width={10}>
        <Segment clearing>
        <Container clearing  >
          <Header as='h2' floated="left">
            <Icon name='plane' />
            <Header.Content>
              Flight Ticket Deals
  
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
          {flightsFiltered.map((flight) => (
            
           
            <Item key={flight.id}>
               <>
            <label hidden>
            {flightBookingToAdd!.productId = flight.id}
          </label>
          </>
            
              {/* <Item.Image src="/assets/placeholder.png" size='medium' /> */}
              <Item.Content>
                <Item.Header as="a">{flight.name}</Item.Header>
                <Item.Description>
                  {flight.type} 
                </Item.Description>
                <Item.Meta>{flight.price}$ per person</Item.Meta>
                <Item.Description>
                <b>Flight Departure:</b>  {flight.combinedDepLocation} at &nbsp; 
                {flight.departingDepartingTime} <Icon name="long arrow alternate right" color="orange" size="big" /> {flight.combinedDestination} at {flight.departingArrivingTime} on {String(flight.departingDate).split("T")[0]}
                </Item.Description>
                <Item.Description>
                 {flight.type ==="Round Trip" &&
                  <div><b>Return Flight:</b> {flight.combinedDestination} at &nbsp; 
                  {flight.returnDepartingTime} <Icon name="long arrow alternate right" color="orange" size="big" /> {flight.combinedDepLocation} at {flight.returnArrivingTime} on {String(flight.returningDate).split("T")[0]}  </div>}
                  <Button color='orange' 
                  floated='right'
                  onClick={() => openModal(<FlightBooking />)}>
            Book
            <Icon name='chevron right' />
          </Button>
          {/* {String(flight.returningDate).split("T")[0]} */}
                </Item.Description>
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
                Filter by Ticket Type, Flight Locations or Flight Dates!
                    </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>
        <Container style={{ marginTop: "5.5em" }}>
          <Header as='h3' dividing>
          </Header>
        </Container >
        <Container>
            <br/>
            <label><b>Ticket Type:</b></label><br/>
           <select className="mdb-select md-form colorful-select dropdown-primary" defaultValue={typeString} onChange={handleTypeFilterChange} name="type"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                    <option selected disabled value=""></option>
                    <option key="OWT" value="One Way Ticket">One Way Ticket</option>
                    <option key="RT" value="Round Trip">Round Trip</option>

                </select>
      
            <br/>
            <br/>
              <label><b>Departure Date:</b></label>
              <Input style={{marginBottom: "1em"}} type="date" fluid
                value={depDateString}
                onChange={handleDepDateFilterChange}
                />
            
            {typeString === "round trip" &&
            <div>
            <label><b>Return Date:</b></label>
            <Input style={{marginBottom: "1em"}} type="date" fluid
                value={retDateString}
                onChange={handleRetDateFilterChange}
             />
                </div>
            }
 
          <label><b>From:</b></label>
              <Input style={{marginBottom: "1em"}} type="text" icon="search" fluid
                  value={depLocationString}
                  onChange={handleDepLocationFilterChange}
                  placeholder="City, Country..." />
    
             
              <label><b>To:</b></label>
                <Input type="text" icon="search" fluid
                  value={destinationString}
                  onChange={handleDestinationFilterChange}
                  placeholder="City, Country..." />
        </Container>
            </Segment>
            </Grid.Column >   
            </Grid>   
            )
}

export default observer(FlightListClient);