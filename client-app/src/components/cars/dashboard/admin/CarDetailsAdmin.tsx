import React, { useContext } from "react";
import { Image, Card, ButtonGroup, Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";


const CarDetailsAdmin: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { selectedCar, openEditForm, cancelSelectedCar } = rootStore.carStore;
  return (
    <Card fluid>
     <Image src={`/assets/carImages/${selectedCar!.name}.jpg`} fluid />
      <Card.Content>
        <Card.Header>{selectedCar!.name}</Card.Header>
        <Card.Meta>
          <span >{selectedCar!.price}$</span>
        </Card.Meta>
        <Card.Meta>
          <span >{selectedCar!.city}, {selectedCar!.country}</span>
        </Card.Meta>
        <Card.Description>
          {selectedCar!.description}
        </Card.Description>
        <Label style={{marginTop: "0.7em"}} basic content={selectedCar!.options} />
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button onClick={() => openEditForm(selectedCar!.id)} basic color='blue' content='Edit' />
          <Button onClick={cancelSelectedCar} basic color='grey' content='Cancel' />
        </ButtonGroup>
      </Card.Content>
      
    </Card>
  );
};

export default observer(CarDetailsAdmin);