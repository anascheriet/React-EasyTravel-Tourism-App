import React, { useContext, useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Label, Segment, Item, Button, Icon, Header, Grid, Container, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ClientActivityBookList = () => {
    const rootStore = useContext(RootStoreContext);
    const {  clientActivityList, activityBookingsByDate } = rootStore.activityStore;

    const [bookingDateString, setbookingDateString] = useState("");
    const [activityDateString, setactivityDateString] = useState("");

    const handleDateFilterChange = (event: any) => {
        setbookingDateString(event.target.value);
      }

      const handleActivityDateFilterChange = (event: any) => {
        setactivityDateString(event.target.value);
      }

      useEffect(() => {
        setbookingDateString(bookingDateString);
        setactivityDateString(activityDateString);
      },[bookingDateString,activityDateString])

      var activitiesFiltered = activityBookingsByDate;

      if(bookingDateString.length > 0 && activityDateString.length === 0){
        activitiesFiltered = activitiesFiltered.filter((x) => {
            return x.bookingDate?.match(bookingDateString);
        });
      }
      else if(bookingDateString.length === 0 && activityDateString.length > 0){
        activitiesFiltered = activitiesFiltered.filter((x) => {
            return String(x.activityDate).match(activityDateString);
        });
      }
      else if(bookingDateString.length > 0 && activityDateString.length > 0){
        activitiesFiltered = activitiesFiltered.filter((x) => {
            return String(x.activityDate).match(activityDateString) && x.bookingDate?.match(bookingDateString) ;
        });
      }


    return (
        <div>
             <Grid>
                        <Grid.Column width={10}>
                         {activitiesFiltered.length !== 0 ? ( 
                            <Fragment>
                                {activitiesFiltered.map((activityB) => {
                                    { var ActBk = clientActivityList.find(a => a.id === activityB.productId) }
                                    return <div>
                                        <Label color='teal' size='large' key={activityB.bookingDate}>
                                        Booked On: {activityB.bookingDate?.split("T")[0]} At {activityB.bookingDate?.split("T")[1].split('.')[0]}
                                        </Label>
                                        <Segment clearing>
                                            <Item.Group>
                                                <Item key={activityB.productId}>
                                                <Item.Image src={`/assets/activityImages/${ActBk?.name}.jpg`} fluid />
                                                    <Item.Content>
                                                        <Item.Header as="a">
                                                            {ActBk?.name}
                                                        </Item.Header>
                                                        <Item.Description>
                                                           <b> Booked for: {String(activityB.activityDate!).split('T')[0]}</b>
                                                        </Item.Description>
                                                        <Item.Meta>
                                                            {ActBk?.price}$ <br/>
                                                            {activityB.adults} adults <br/>
                                                            {activityB.kids} kids (-30%) 
                                                        </Item.Meta>
                                                        
                  <b>Total To Pay: {(Number(ActBk?.price) * Number(activityB.adults)) + (Number(activityB.kids) * (0.7 * Number(ActBk?.price))) }$</b>
                                <Button color='red' floated='right'>
                                     <Icon name='cancel' />
                                        Cancel Booking
                                </Button>         
                                <Button color='blue' as={Link} to={`/activities/${activityB.productId}`}
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
                                 Oops - No Activity Bookings Available.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/activities' primary>
                                    Go To Activities page
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
                  <Input label='Activity Date' style={{marginBottom: "1em"}} type="date" fluid
                   value={activityDateString}
                   onChange={handleActivityDateFilterChange}
                />
        </Container>
            </Segment>
                        </Grid.Column>
                    </Grid>
    </div>
      
    )
}

export default observer(ClientActivityBookList);
