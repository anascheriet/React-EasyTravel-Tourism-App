import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Card, Label, ButtonGroup, Button, Image } from 'semantic-ui-react';

const RestaurantDetailsAdmin = () => {
    const rootStore = useContext(RootStoreContext);
    const { selectedRestaurant, openEditForm, cancelSelectedRestaurant } = rootStore.restaurantStore;
    return (
        <Card fluid>
            {/* <Image src={`/assets/carImages/${selectedRestaurant!.name}.jpg`} fluid /> */}
            <Image src='/assets/placeholder.png' fluid />
            <Card.Content>
                <Card.Header>{selectedRestaurant!.name}</Card.Header>
                <Card.Meta>
                    <span >{selectedRestaurant!.meals}</span>
                </Card.Meta>
                <Card.Meta>
                    <span >{selectedRestaurant!.city}, {selectedRestaurant!.country}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedRestaurant!.description}
                    <br />
                        {selectedRestaurant!.phoneNumber} 
                        <br />
                </Card.Description>
                <Label style={{ marginTop: "0.7em" }} basic content={selectedRestaurant!.adress} />
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => openEditForm(selectedRestaurant!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedRestaurant} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>

        </Card>
    )
}

export default observer(RestaurantDetailsAdmin);