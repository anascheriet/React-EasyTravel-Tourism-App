import React, { useContext, useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { SuccessfullCancellingModal } from '../../../app/layout/SuccessfullCancellingModal';
import { CancelBookingErrorModal } from '../../../app/layout/CancelBookingErrorModal';
import { Link } from 'react-router-dom';
import { Grid, Label, Segment, Item, Button, Icon, Header, Container, Input } from 'semantic-ui-react';

const RestaurantBookListClient = () => {
    const rootStore = useContext(RootStoreContext);
    const {  clientRestaurantList, restaurantBookingsByDate, deleteRestaurantBooking } = rootStore.restaurantStore;
    const { openModal } = rootStore.modalStore;
    const {dateDiffInDays} = rootStore.commonStore;

    const [bookingDateString, setbookingDateString] = useState("");
    const [mealDateString, setMealDateString] = useState("");

    const handleDateFilterChange = (event: any) => {
        setbookingDateString(event.target.value);
      }

      const handleMealDateFilterChange = (event: any) => {
        setMealDateString(event.target.value);
      }

      useEffect(() => {
        setbookingDateString(bookingDateString);
        setMealDateString(mealDateString);
      },[bookingDateString,mealDateString])

      var mealsFiltered = restaurantBookingsByDate;

      if(bookingDateString.length > 0 && mealDateString.length === 0){
        mealsFiltered = mealsFiltered.filter((x) => {
            return x.bookingDate?.match(bookingDateString);
        });
      }
      else if(bookingDateString.length === 0 && mealDateString.length > 0){
        mealsFiltered = mealsFiltered.filter((x) => {
            return String(x.mealDate).match(mealDateString);
        });
      }
      else if(bookingDateString.length > 0 && mealDateString.length > 0){
        mealsFiltered = mealsFiltered.filter((x) => {
            return String(x.mealDate).match(mealDateString) && x.bookingDate?.match(bookingDateString) ;
        });
      }

      const verifyDelete = (id: number, diff: number) => {
        if(diff > 1){
            deleteRestaurantBooking(id).then(() => openModal(<SuccessfullCancellingModal />));
        }
        else openModal(<CancelBookingErrorModal />)
    }


      
    return (
        <div>
            <Grid>
                        <Grid.Column width={10}>
                         {mealsFiltered.length !== 0 ? ( 
                            <Fragment>
                                {mealsFiltered.map((mealB) => {
                                    { var RstBk = clientRestaurantList.find(a => a.id === mealB.productId) }
                                    {var todayDate = new Date().toISOString().slice(0,10);}
                                    {var datenow = new Date(todayDate)}
                                    {var dateFrom = new Date(mealB.mealDate!)}
                                    {var diff = dateDiffInDays(datenow,dateFrom)}
                                    
                                    return <div>
                                        <Label color='teal' size='large' key={mealB.bookingDate}>
                                        Booked On: {mealB.bookingDate?.split("T")[0]} At {mealB.bookingDate?.split("T")[1].split('.')[0]}
                                        </Label>
                                        <Segment clearing>
                                            <Item.Group>
                                                <Item key={mealB.productId}>
                                                <Item.Image src={`/assets/mealImages/${RstBk?.name}.jpg`}  fluid />
                                                    <Item.Content>
                                                        <Item.Header as="a">
                                                            {RstBk?.name}
                                                        </Item.Header>
                                                        <Item.Description>
                                                           <b> Booked for: {String(mealB.mealDate!).split('T')[0]}</b>
                                                        </Item.Description>
                                                        <Item.Meta>
                                                            {RstBk?.phoneNumber} <br/>
                                                            {mealB.people} people <br/>
                                                            
                                                        </Item.Meta>
                  
                                <Button color='red' floated='right'
                                 onClick={(e) => verifyDelete(mealB.restaurantBookingId!, diff)}
                                >
                                     <Icon name='cancel' />
                                        Cancel Booking
                                </Button>         
                                <Button color='blue' as={Link} to={`/restaurants/${mealB.productId}`}
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
                                <Icon name='ticket' />
                                 Oops - No Restaurant Bookings Available.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/activities' primary>
                                    Go To Restaurants page
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
                  <Input label='Meal Date' style={{marginBottom: "1em"}} type="date" fluid
                   value={mealDateString}
                   onChange={handleMealDateFilterChange}
                />
        </Container>
            </Segment>
                        </Grid.Column>
                    </Grid>
        </div>
    )
}

export default observer(RestaurantBookListClient)
