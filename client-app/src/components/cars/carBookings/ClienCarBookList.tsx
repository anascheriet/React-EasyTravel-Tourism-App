import React, { useContext, Fragment, useState, useEffect } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Label, Segment, Header, Icon, Button, Grid, Item, Container, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SuccessfullCancellingModal } from '../../../app/layout/SuccessfullCancellingModal';
import { CancelBookingErrorModal } from '../../../app/layout/CancelBookingErrorModal';

const ClientCarBookList = () => {
    const rootStore = useContext(RootStoreContext);
    const { carBookingsByDate,deleteCarBooking , clientCarList, target, submitting } = rootStore.carStore;
    const { openModal } = rootStore.modalStore;
    const {dateDiffInDays} = rootStore.commonStore;


    const [bookingDateString, setbookingDateString] = useState("");

    const handleDateFilterChange = (event: any) => {
        setbookingDateString(event.target.value);
      }

      useEffect(() => {
        setbookingDateString(bookingDateString);
      },[bookingDateString])

      var carsFiltered = carBookingsByDate;

      if(bookingDateString.length > 0){
        carsFiltered = carsFiltered.filter((x) => {
            return x.bookingDate?.match(bookingDateString);
        });
      }

      const verifyDelete = (id: number, diff: number) => {
          if(diff > 7){
              deleteCarBooking(id).then(() => openModal(<SuccessfullCancellingModal />));
          }
          else openModal(<CancelBookingErrorModal />)
      }
    
    return (
        <div>
             <Grid>
                        <Grid.Column width={10}>
                         {carsFiltered.length !== 0 ? ( 
                            <Fragment>
                                {carsFiltered.map((carB) => {
                                    { var CARBk = clientCarList.find(a => a.id === carB.productId) }
                                    {var todayDate = new Date().toISOString().slice(0,10);}
                                    {var datenow = new Date(todayDate)}
                                    {var dateFrom = new Date(carB.startingFromDate!)}
                                    {var diff = dateDiffInDays(datenow,dateFrom)}
                                    {var dateEnd = new Date(carB.startingFromDate!)}
                                    {var days = (dateFrom.getDate() - dateEnd.getDate())}
                                  
                                
                                    return <div>
                                        {/* <Label color='teal' size='large'>{diff}</Label> */}
                                        {/* <Label color='teal' size='large'>{d}</Label> */}
                                        <Label color='teal' size='large'>{diff}</Label>
                                        <Label color='teal' style={{marginTop: "1em"}} size='large' key={carB.bookingDate}>
                                        Booked On: {carB.bookingDate?.split("T")[0]} At {carB.bookingDate?.split("T")[1].split('.')[0]}
                                        </Label>
                                        <Segment clearing>
                                            <Item.Group>
                                                <Item key={carB.productId}>
                                                <Item.Image src={`/assets/carImages/${CARBk?.name}.jpg`} fluid />
                                                    <Item.Content>
                                                        <Item.Header as="a">
                                                            {CARBk?.name}
                                                        </Item.Header>
                                                        <Item.Description>
                                                           <b> Booked from {String(carB.startingFromDate).split('T')[0]} To {String(carB.endingDate).split('T')[0]} ({days} days) </b>
                                                        </Item.Description>
                                                        <Item.Meta>
                                                            {CARBk?.price}$ <br/>
                                                        </Item.Meta>
                                               
                  <b>Total To Pay: {(Number(CARBk?.price) * days)}$</b>
                                <Button
                                 color='red'
                                  floated='right'
                                  loading={target === String(carB.carBookingId) && submitting}
                                  onClick={(e) => verifyDelete(carB.carBookingId!, diff)}
                                  >
                                      
                                 <Icon name='cancel' />
                                 Cancel Booking
                                </Button>       
                                <Button color='blue' as={Link} to={`/cars/${carB.productId}`}
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
                                <Icon name='car' />
                                 Oops - No Car Bookings Available.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/cars' primary>
                                    Go To Cars page
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

export default observer(ClientCarBookList);
