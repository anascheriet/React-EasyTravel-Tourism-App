import React, { useContext } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Card, Image, Label, ButtonGroup, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const ActivityDetailsAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { selectedActivity, openEditForm, cancelSelectedActivity } = rootStore.activityStore;
    return (
        <Card fluid>
            <Image src={`/assets/carImages/${selectedActivity!.name}.jpg`} fluid />
            <Card.Content>
                <Card.Header>{selectedActivity!.name}</Card.Header>
                <Card.Meta>
                    <span >{selectedActivity!.price}$</span>
                </Card.Meta>
                <Card.Meta>
                    <span >{selectedActivity!.city}, {selectedActivity!.country}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity!.description}
                </Card.Description>
                <Label style={{ marginTop: "0.7em" }} basic content={selectedActivity!.package} />
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => openEditForm(selectedActivity!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>

        </Card>
    )
}
export default observer(ActivityDetailsAdmin);