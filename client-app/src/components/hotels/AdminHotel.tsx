import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import HotelDashBoardAdmin from './dashboard/admin/HotelDashBoardAdmin';

const AdminHotel = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllHotels, emptyAllHotels, loadingInitial } = rootStore.hotelStore;
    const { user } = rootStore.userStore;
    useEffect(() => {

        loadAllHotels();
        emptyAllHotels();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAllHotels, emptyAllHotels]);

    if (loadingInitial) return <LoadingComponent content="Loading Hotels..." />;
    return (
        <div>
          <HotelDashBoardAdmin/>
        </div>
    );
};
export default observer(AdminHotel);