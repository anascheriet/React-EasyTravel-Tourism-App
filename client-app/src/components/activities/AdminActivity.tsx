import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import ActivityDashboardAdmin from './admin/ActivityDashboardAdmin';

const AdminActivity = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdminActivities, emptyAdminActivities, loadingInitial } = rootStore.activityStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadAdminActivities(user?.username);
        emptyAdminActivities();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAdminActivities, emptyAdminActivities, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Activities..." />;

    return (
        <div>
            <ActivityDashboardAdmin />
        </div>
    )
}

export default observer(AdminActivity)
