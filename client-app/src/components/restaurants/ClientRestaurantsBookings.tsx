import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import RestaurantBookListClient from './RestaurantBookings/RestaurantBookListClient';

const ClientRestaurantsBookings = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllRestaurants, loadClientRestaurantBookings, emptyClientBookings, loadingInitial } = rootStore.restaurantStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadAllRestaurants();
        loadClientRestaurantBookings(user?.username);
        emptyClientBookings();
    }, [loadClientRestaurantBookings, emptyClientBookings, loadAllRestaurants, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Your Restaurant Bookings..." />;

    return (
        <div>
            <RestaurantBookListClient />
        </div>
    )
}

export default observer(ClientRestaurantsBookings)
