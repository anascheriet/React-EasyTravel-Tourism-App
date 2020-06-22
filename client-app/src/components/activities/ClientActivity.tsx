import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { ActivityListClient } from './client/ActivityListClient';

const ClientActivity = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllActivities, emptyAllActivities, loadingInitial } = rootStore.activityStore;

    useEffect(() => {

        loadAllActivities();
        emptyAllActivities();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAllActivities, emptyAllActivities]);

    if (loadingInitial) return <LoadingComponent content="Loading Activities..." />;
    return (
        <div>
            <ActivityListClient />
        </div>
    )
}

export default observer(ClientActivity)
