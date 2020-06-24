import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import ClientFlighBookList from './flightBookings/ClientFlighBookList';

const ClientFlightBooking
    = () => {
        const rootStore = useContext(RootStoreContext);
        const {  loadAllFlights, loadClientFlightBookings,emptyBookedFlight, loadingInitial } = rootStore.flightStore;
        const { user } = rootStore.userStore;

        useEffect(() => {
            loadAllFlights();
            loadClientFlightBookings(user?.username);
            emptyBookedFlight();
        }, [loadClientFlightBookings,emptyBookedFlight, loadAllFlights, user]);

        if (loadingInitial) return <LoadingComponent content="Loading Your Flight Bookings..." />;
        return (
            <div>
                <ClientFlighBookList />
            </div>
        )
    }

export default observer(ClientFlightBooking)

