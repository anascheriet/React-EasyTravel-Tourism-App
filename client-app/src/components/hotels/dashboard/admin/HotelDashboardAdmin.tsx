import React, { useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid } from 'semantic-ui-react';
import HotelListAdmin from './HotelListAdmin';
import HotelDetailsAdmin from './HotelDetailsAdmin';
import { HotelForm } from '../../form/HotelForm';

const HotelDashboardAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { editMode, selectedHotel } = rootStore.hotelStore;


    return (
        <div>
            <Grid>
                <Grid.Column width={10}>

                    <HotelListAdmin />
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedHotel && !editMode && (
                        <HotelDetailsAdmin />
                    )}
                    {editMode && (
                        <HotelForm
                            key={(selectedHotel && selectedHotel.id) || 0}
                            hotel={selectedHotel!}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default observer(HotelDashboardAdmin);