import React, { useContext, useEffect, useState, Fragment } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Label, Grid, Segment, Item, Button, Icon, Header, Container, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SuccessfullCancellingModal } from '../../app/layout/SuccessfullCancellingModal';
import { CancelBookingErrorModal } from '../../app/layout/CancelBookingErrorModal';

const ClientHotelBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadClientHotelBookings,loadAllHotels,deleteHotelBooking, emptyAllHotels,loadingInitial,hotelBookingsByDate,clientHotelsByPrice, emptyHotelBookings } = rootStore.hotelStore;
    const { user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    const {dateDiffInDays} = rootStore.commonStore;

    const [bookingDateString, setbookingDateString] = useState("");

    const handleDateFilterChange = (event: any) => {
        setbookingDateString(event.target.value);
      }

    useEffect(() => {
        setbookingDateString(bookingDateString);
        loadAllHotels();
        emptyAllHotels();
        loadClientHotelBookings(user?.username);
        emptyHotelBookings();
        //emptyHotelBookings();
    }, [loadAllHotels,loadClientHotelBookings,emptyHotelBookings,bookingDateString]);

    var hotelsFiltered = hotelBookingsByDate;

      if(bookingDateString.length > 0){
        hotelsFiltered = hotelsFiltered.filter((x) => {
            return x.bookingDate?.match(bookingDateString);
        });
      }


    if (loadingInitial) return <LoadingComponent content="Loading Your Hotel Bookings..." />;

    const verifyDelete = (id: number, diff: number) => {
        if(diff > 7){
            deleteHotelBooking(id).then(() => openModal(<SuccessfullCancellingModal />));
        }
        else openModal(<CancelBookingErrorModal />)
    }

    return (
        <div>
        <Grid>
            <Grid.Column width={10}>
                         {hotelBookingsByDate.length !== 0 ? ( 
                            <Fragment>
                                {hotelBookingsByDate.map((hotelB) => {
                                    { var HTLBk = clientHotelsByPrice.find(a => a.id === hotelB.productId) }
                                    {var todayDate = new Date().toISOString().slice(0,10);}
                                    {var datenow = new Date(todayDate)}
                                    {var dateFrom = new Date(hotelB.startingFromDate!)}
                                    {var diff = dateDiffInDays(datenow,dateFrom)}
                                    {var dateEnd = new Date(hotelB.endingDate!)}
                                    {var days = dateDiffInDays(dateFrom,dateEnd)}
                                
                                    return <div>
                                        <Label color='teal' size='large' key={hotelB.bookingDate} style={{marginTop:"1em"}}>
                                        Booked On: {hotelB.bookingDate?.split("T")[0]} At {hotelB.bookingDate?.split("T")[1].split('.')[0]}
                                        </Label>
                                        <Segment clearing>
                                            <Item.Group>
                                                <Item key={hotelB.productId}>
                                                <Item.Image src={"/assets/placeholder.png"} fluid />
                                                    <Item.Content>
                                                        <Item.Header as="a">
                                                            {HTLBk?.name}
                                                        </Item.Header>
                                                        <Item.Description>
                                                           <b> Booked from {String(hotelB.startingFromDate).split('T')[0]} To {String(hotelB.endingDate).split('T')[0]} ({days} days) </b>
                                                        </Item.Description>
                                                        <Item.Meta>
                                                            {HTLBk?.city}, {HTLBk?.country} <br/>
                                                            {HTLBk?.price}$ <br/>
                                                        </Item.Meta>
                                               
                  <b>Total To Pay: {(Number(HTLBk?.price) * days)}$</b>
                                <Button color='red' floated='right'
                                 onClick={(e) => verifyDelete(hotelB.hotelBookingId!, diff)}
                                >
                                     <Icon name='cancel' />
                                        Cancel Booking
                                </Button>         
                                <Button color='blue' as={Link} to={`/hotels/${hotelB.productId}`}
                                                            floated='right'>
                                        <Icon name='eye' />
                                                View Item
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
                                <Icon name='hotel' />
                                 Oops - No Hotel Bookings Available.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/hotels' primary>
                                    Go To Hotels page
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
               onChange={handleDateFilterChange}
                />
        </Container>
            </Segment>
                        </Grid.Column>
                    </Grid>
        </div>
    )
}

export default observer(ClientHotelBooking);
