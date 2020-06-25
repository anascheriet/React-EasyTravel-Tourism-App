import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import RestaurantListAdmin from './RestaurantListAdmin';
import RestaurantDetailsAdmin from './RestaurantDetailsAdmin';
import { RestaurantForm } from '../../form/RestaurantForm';
import { Grid } from 'semantic-ui-react';

const RestaurantDashBoardAdmin:React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { editMode, selectedRestaurant } = rootStore.restaurantStore;
    
    return (
        <div>
             <Grid>
                <Grid.Column width={10}>

                    <RestaurantListAdmin />
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedRestaurant && !editMode && (
                        <RestaurantDetailsAdmin />
                    )}
                    {editMode && (
                        <RestaurantForm
                            key={(selectedRestaurant && selectedRestaurant.id) || 0}
                            restaurant={selectedRestaurant!}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default observer(RestaurantDashBoardAdmin);