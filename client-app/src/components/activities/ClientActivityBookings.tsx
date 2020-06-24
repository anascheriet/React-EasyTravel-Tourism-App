import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import ClientActivityBookList from './activityBooking/ClientActivityBookList';

import { observer } from 'mobx-react-lite';

const ClientActivityBookings = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllActivities, loadClientActivityBookings, emptyClientBookings, loadingInitial } = rootStore.activityStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadAllActivities();
        loadClientActivityBookings(user?.username);
        emptyClientBookings();
    }, [loadClientActivityBookings, emptyClientBookings, loadAllActivities, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Your Activity Bookings..." />;
    return (
        <div>
            <ClientActivityBookList />
        </div>
    )
}

export default observer(ClientActivityBookings)
