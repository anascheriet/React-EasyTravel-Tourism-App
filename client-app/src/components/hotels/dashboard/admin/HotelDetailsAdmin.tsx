import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Card, Label, ButtonGroup, Button, Image } from 'semantic-ui-react';

const HotelDetailsAdmin: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { selectedHotel, openEditForm, cancelSelectedHotel } = rootStore.hotelStore;
    return (
        <Card fluid>
            <Image src={`/assets/carImages/${selectedHotel!.name}.jpg`} fluid />
            <Card.Content>
                <Card.Header>{selectedHotel!.name}</Card.Header>
                <Card.Meta>
                    <span >{selectedHotel!.price}$</span>
                </Card.Meta>
                <Card.Meta>
                    <span >{selectedHotel!.city}, {selectedHotel!.country}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedHotel!.description}
                </Card.Description>
                <Label style={{ marginTop: "0.7em" }} basic content={selectedHotel!.adress} />
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => openEditForm(selectedHotel!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedHotel} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>

        </Card>
    )
}

export default observer(HotelDetailsAdmin);
