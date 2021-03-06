import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import ClientCarBookList from './carBookings/ClienCarBookList';
import { observer } from 'mobx-react-lite';

const ClientCarBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadClientCarBookings, loadingInitial, loadAllCars, emptyCarBookings } = rootStore.carStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadAllCars();
        loadClientCarBookings(user?.username);
        emptyCarBookings();
    }, [loadClientCarBookings, loadAllCars, emptyCarBookings, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Your Car Bookings..." />;

    return (
        <div>
            <ClientCarBookList />
        </div>
    )
}

export default observer(ClientCarBooking)
