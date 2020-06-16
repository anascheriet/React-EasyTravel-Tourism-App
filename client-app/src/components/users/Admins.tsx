import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { AdminDashBoard } from './AdminDashBoard';
import { observer } from 'mobx-react-lite';

const Admins = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdmins,loadSudoAdmins,emptyList, loadingInitial } = rootStore.userStore;

    useEffect(() => {
        loadSudoAdmins();
        loadAdmins();
        emptyList();
    }, [loadAdmins, emptyList, loadSudoAdmins]);

    if(loadingInitial) return <LoadingComponent  content="Loading Admins..."/>
    return (
        <div>
            <AdminDashBoard />
        </div>
    )
}

export default observer(Admins);
