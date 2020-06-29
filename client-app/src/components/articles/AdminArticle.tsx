import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../app/stores/rootStore';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import ArticleDashboardAdmin from './admin/ArticleDashboardAdmin';

const AdminArticle = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAdminArticles, emptyAdminArticles, loadingInitial } = rootStore.articleStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadAdminArticles(user?.username);
        emptyAdminArticles();
        //empty the array so it can be re-loaded --to be updated
    }, [loadAdminArticles, emptyAdminArticles, user]);

    if (loadingInitial) return <LoadingComponent content="Loading Your Articles..." />;

    return (
        <div>
            <ArticleDashboardAdmin />
        </div>
    )
}

export default observer(AdminArticle)
