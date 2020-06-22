import React, { useContext } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Grid } from 'semantic-ui-react';
import CarDetailsAdmin from '../../cars/dashboard/admin/CarDetailsAdmin';
import { CarForm } from '../../cars/form/CarForm';
import ActivityListAdmin from './ActivityListAdmin';
import { ActitvityForm } from '../form/ActitvityForm';
import { observer } from 'mobx-react-lite';
import ActivityDetailsAdmin from './ActivityDetailsAdmin';

const ActvityDashboardAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { editMode, selectedActivity } = rootStore.activityStore;

    return (
        <div>
            <Grid>
                <Grid.Column width={10}>

                    <ActivityListAdmin />
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedActivity && !editMode && (
                        <ActivityDetailsAdmin />
                    )}
                    {editMode && (
                        <ActitvityForm
                            key={(selectedActivity && selectedActivity.id) || 0}
                            activity={selectedActivity!}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default observer(ActvityDashboardAdmin)
