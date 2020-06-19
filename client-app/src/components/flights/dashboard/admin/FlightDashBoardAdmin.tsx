import React, { useContext } from 'react'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Grid, GridColumn } from 'semantic-ui-react';
import FlightListAdmin from './FlightListAdmin';
import { observer } from 'mobx-react-lite';
import FlightDetailsAdmin from './FlightDetailsAdmin';
import { FlightForm } from '../../form/FlightForm';

const FlightDashBoardAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { editMode, selectedFlight } = rootStore.flightStore;
    return (
        <div>
            <Grid>
                <GridColumn width={10}>
                    <FlightListAdmin />
                </GridColumn>
                <Grid.Column width={6}>
                    {selectedFlight && !editMode && (
                        <FlightDetailsAdmin />
                    )}
                    {editMode && (
                        <FlightForm
                            key={(selectedFlight && selectedFlight.id) || 0}
                            flight={selectedFlight!}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}
export default observer(FlightDashBoardAdmin);