import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Card, ButtonGroup, Button, Image } from 'semantic-ui-react';

const ArticleDetailsAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { selectedArticle, openEditForm, cancelselectedArticle } = rootStore.articleStore;
    return (
        <Card fluid>
            <Image src={`/assets/articleImages/${selectedArticle!.name}.jpg`} fluid />
            <Card.Content>
                <Card.Header>{selectedArticle!.name}</Card.Header>
                <Card.Description>
                    {selectedArticle!.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => openEditForm(selectedArticle!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelselectedArticle} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>

        </Card>
    )
}

export default observer(ArticleDetailsAdmin)
