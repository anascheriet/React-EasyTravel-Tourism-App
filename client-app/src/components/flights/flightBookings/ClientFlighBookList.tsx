import React, { useContext, Fragment, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Label, Segment, Header, Icon, Button, Item, Grid, Container, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SuccessfullCancellingModal } from '../../../app/layout/SuccessfullCancellingModal';
import { CancelBookingErrorModal } from '../../../app/layout/CancelBookingErrorModal';

const ClientFlighBookList = () => {
    const rootStore = useContext(RootStoreContext);
    const { flightBookingsByDate,deleteFlightBooking, clientFlightList } = rootStore.flightStore;
    const { openModal } = rootStore.modalStore;
    const {dateDiffInDays} = rootStore.commonStore;


    const [bookingDateString, setbookingDateString] = useState("");

    const handleDateFilterChange = (event: any) => {
        setbookingDateString(event.target.value);
      }
      useEffect(() => {
        setbookingDateString(bookingDateString);
      },[bookingDateString])

      var FlightBFiltered = flightBookingsByDate;

      if(bookingDateString.length > 0){
        FlightBFiltered = FlightBFiltered.filter((x) => {
            return x.bookingDate?.match(bookingDateString);
        });
      }

      const verifyDelete = (id: number, diff: number) => {
        if(diff > 7){
            deleteFlightBooking(id).then(() => openModal(<SuccessfullCancellingModal />));
        }
        else openModal(<CancelBookingErrorModal />)
    }
    
    return (
        <div>
                <>
                    <Grid>
                        <Grid.Column width={10}>
{FlightBFiltered.length !== 0 ? ( 
                            <Fragment>
                                {flightBookingsByDate.map((flightB) => {
                                    { var FlBk = clientFlightList.find(a => a.id === flightB.productId) }
                                    {var todayDate = new Date().toISOString().slice(0,10);}
                                    {var datenow = new Date(todayDate)}
                                    {var dateFrom = new Date(FlBk?.departingDate!)}
                                    {var diff = dateDiffInDays(datenow,dateFrom)}

                                    return <div>
                                        <Label color='teal' content={diff} /> 
                                        <Label color='teal' content={flightB.flightBookingId!} /> 
                                        <Label color='teal' size='large' key={flightB.bookingDate}   style={{marginTop: "1em"}}>
                                        Booked On: {flightB.bookingDate?.split("T")[0]} At {flightB.bookingDate?.split("T")[1].split('.')[0]}
                                        </Label>
                                        <Segment clearing>
                                            <Item.Group>
                                                <Item key={flightB.productId}>
                                                    <Item.Content>
                                                        <Item.Header as="a">
                                                            {FlBk?.name}
                                                        </Item.Header>
                                                        <br />
                                                        <Item.Description>
                                                            {FlBk?.type}
                                                        </Item.Description>
                                                        <Item.Meta>
                                                            {FlBk?.price}$ <br/>
                                                            {flightB.adults} adults <br/>
                                                            {flightB.kids} kids (-30%) 
                                                        </Item.Meta>
                                                        <Item.Description>
                                                            <b>Flight Departure:</b>  {FlBk?.combinedDepLocation} at &nbsp;
                {FlBk?.departingDepartingTime} <Icon name="long arrow alternate right" color="orange" size="big" /> {FlBk?.combinedDestination} at {FlBk?.departingArrivingTime} on {String(FlBk?.departingDate).split("T")[0]}
                                                        </Item.Description>
                                                        <Item.Description>
                                                            {FlBk?.type === "Round Trip" &&
                                                                <div><b>Return Flight:</b> {FlBk?.combinedDestination} at &nbsp;
                  {FlBk?.returnDepartingTime} <Icon name="long arrow alternate right" color="orange" size="big" /> {FlBk?.combinedDepLocation} at {FlBk?.returnArrivingTime} on {String(FlBk?.returningDate).split("T")[0]} </div>}</Item.Description >
                  <b>Total To Pay: {(Number(FlBk?.price) * Number(flightB.adults)) + (Number(flightB.kids) * (0.7 * Number(FlBk?.price))) }$</b>
                                                        <Button color='red'
                                                            floated='right'
                                                            onClick={(e) => verifyDelete(flightB.flightBookingId!, diff)}
                                                        >
                                                              <Icon name='cancel' />
                                                            Cancel Booking
                                          
                                                        </Button>
                                                    </Item.Content>
                                                </Item>
                                            </Item.Group>

                                        </Segment>

                                    </div>
                                })}
                            </Fragment> ) : (
                                <>
                        <Segment placeholder>
                            <Header icon>
                                <Icon name='plane' />
                                 Oops - No Flight Ticket Bookings Available.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/flights' primary>
                                    Go To Flight Tickets page
     </Button>
                            </Segment.Inline>
                        </Segment>
                    </> 
                            )}
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <Segment clearing >
        <Container clearing  >
        <Header as='h2' floated="left">
            <Icon name='filter' />
            <Header.Content>
              Filters
  
            <Header.Subheader>
                Filter by Booking Date!
                    </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>
        <Container style={{ marginTop: "5.5em" }}>
          <Header as='h3' dividing>
          </Header>
        </Container >
        <Container>
            
              <Input label='Booking Date' style={{marginBottom: "1em"}} type="date" fluid
               value={bookingDateString}
               onChange={handleDateFilterChange
            }
                />
        </Container>
            </Segment>
                        </Grid.Column>
                    </Grid>
                </>
        
            
        </div >
    )
}

export default observer(ClientFlighBookList);
