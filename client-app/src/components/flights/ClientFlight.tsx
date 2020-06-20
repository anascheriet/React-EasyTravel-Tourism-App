import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import FlightListClient from './dashboard/client/FlightListClient';

const ClientFlight = () => {
    const rootStore = useContext(RootStoreContext);
    const{loadAllFlights, emptyAllFlights, loadingInitial} = rootStore.flightStore;

    useEffect(() => {
        loadAllFlights();
        emptyAllFlights();
    }, [loadAllFlights, emptyAllFlights]);

    if(loadingInitial) return <LoadingComponent content="Loading Flight Ticket Offers..." />
    return (
        <div>
            <FlightListClient />
        </div>
    )
}

export default observer(ClientFlight)
