import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import RestaurantListClient from './dashboard/client/RestaurantListClient';

const ClientRestaurant = () => {
    const rootStore = useContext(RootStoreContext);
    const{loadAllRestaurants, emptyAllRestaurants, loadingInitial} = rootStore.restaurantStore;

    useEffect(() => {
        loadAllRestaurants();
        emptyAllRestaurants();
    }, [loadAllRestaurants, emptyAllRestaurants]);

    if(loadingInitial) return <LoadingComponent content="Loading Restaurant Offers..." />
    return (
        <div>
            <RestaurantListClient />
        </div>
    )
}

export default observer(ClientRestaurant)
