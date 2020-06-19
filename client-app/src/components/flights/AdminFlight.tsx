import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import FlightDashBoardAdmin from './dashboard/admin/FlightDashBoardAdmin';

const AdminFlight = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdminFlights, emptyAdminFlights, loadingInitial } = rootStore.flightStore;
    const { user } = rootStore.userStore;
    useEffect(() => {

        loadAdminFlights(user?.username);
        emptyAdminFlights();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAdminFlights, emptyAdminFlights, user]);
    if (loadingInitial) return <LoadingComponent content="Loading Flights..." />;
    return (
        <div>
            <FlightDashBoardAdmin />
        </div>
    )
}

export default observer(AdminFlight)
