import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import ArticleDetailsAdmin from './ArticleDetailsAdmin';
import ArticleForm from '../form/ArticleForm';
import { Grid } from 'semantic-ui-react';
import ArticleListAdmin from './ArticleListAdmin';

const ArticleDashboardAdmin = () => {
    const rootStore = useContext(RootStoreContext);
    const { editMode, selectedArticle } = rootStore.articleStore;
    return (
        <div>

            <Grid>
                <Grid.Column width={10}>
                    <ArticleListAdmin />
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedArticle && !editMode && (
                        <ArticleDetailsAdmin />
                    )}
                    {editMode && (
                        <ArticleForm
                            key={(selectedArticle && selectedArticle.id) || 0}
                            article={selectedArticle!}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default observer(ArticleDashboardAdmin)
