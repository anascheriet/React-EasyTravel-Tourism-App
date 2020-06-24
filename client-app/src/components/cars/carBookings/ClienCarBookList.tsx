import React, { useContext, Fragment } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Label, Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ClientCarBookList = () => {
    const rootStore = useContext(RootStoreContext);
    const { carBookingsByDate } = rootStore.carStore;
    
    return (
        <div>
            {carBookingsByDate.length !== 0 ? (
                <>
                    <Fragment>
                        {carBookingsByDate.map((carB) => {
                            return <Label size='large' key={carB.bookingDate} content={carB.bookingDate} />
                        })}
                    </Fragment>
                </>) : (
                    <>
                        <Segment placeholder>
                            <Header icon>
                                <Icon name='car' />
                                 Oops - You Haven't booked any cars yet.
                            </Header>
                            <Segment.Inline>
                                <Button as={Link} to='/cars' primary>
                                    Go To Cars page
     </Button>
                            </Segment.Inline>
                        </Segment>
                    </>
                )}
        </div>
    )
}

export default observer(ClientCarBookList);
