import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react';

const FlightDetailsAdmin = () => {
    const rootStore = useContext(RootStoreContext);
    const { selectedFlight, openEditForm, cancelSelectedFlight } = rootStore.flightStore;
    return (
        <Card fluid>
            {/* <Image src={`/assets/carImages/${selectedHotel!.name}.jpg`} fluid /> */}
            <Image src='/assets/placeholder.png' fluid />
            <Card.Content>
                {/* <Card.Header>{selectedFlight!.name}</Card.Header> */}
                <Card.Meta>
                    {/* <span >{selectedFlight!.price}$</span> */}
                </Card.Meta>
                <Card.Meta>
                    <span >{selectedFlight!.departingCity}, {selectedFlight!.departingCountry}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedFlight!.type}
                    
                </Card.Description>
                {/* <Label style={{ marginTop: "0.7em" }} basic content={selectedFlight?.arrivingTime} /> */}
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => openEditForm(selectedFlight!.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedFlight} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

export default observer(FlightDetailsAdmin)