import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import RestaurantDashBoardAdmin from './dashboard/admin/RestaurantDashBoardAdmin';

const AdminRestaurants = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdminRestaurants, emptyAdminRestaurants, loadingInitial } = rootStore.restaurantStore;
    const { user } = rootStore.userStore;
    useEffect(() => {

        loadAdminRestaurants(user?.username);
        emptyAdminRestaurants();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAdminRestaurants, emptyAdminRestaurants, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Restaurants..." />;

    return (
        <div>
            <RestaurantDashBoardAdmin />
        </div>
    )
}

export default observer(AdminRestaurants);
