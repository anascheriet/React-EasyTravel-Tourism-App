import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import HoteldashboardAdmin from './dashboard/admin/HoteldashboardAdmin';
import { observer } from 'mobx-react-lite';

const AdminHotel = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdminHotels, emptyAdminHotels, loadingInitial } = rootStore.hotelStore;
    const { user } = rootStore.userStore;
    useEffect(() => {

        loadAdminHotels(user?.username);
        emptyAdminHotels();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAdminHotels, emptyAdminHotels, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Hotels..." />;
    return (
        <div>
            <HoteldashboardAdmin />
        </div>
    )
}
export default observer(AdminHotel);