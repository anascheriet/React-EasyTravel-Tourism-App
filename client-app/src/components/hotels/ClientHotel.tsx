import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { HotelDashboardClient } from './dashboard/client/HotelDashboardClient';

 const ClientHotel = () => {
    const rootStore = useContext(RootStoreContext);
    const{loadAllHotels, emptyAllHotels, loadingInitial} = rootStore.hotelStore;

    useEffect(() => {
        loadAllHotels();
        emptyAllHotels();
    }, [loadAllHotels, emptyAllHotels]);

    if(loadingInitial) return <LoadingComponent content="Loading Hotel Rooms..." />
    return (
        <div>
            <HotelDashboardClient />
        </div>
    )
}

export default observer(ClientHotel)