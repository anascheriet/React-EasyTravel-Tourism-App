import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { CarForm } from "../../form/CarForm";
import CarList from "./CarListAdmin";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import CarDetailsAdmin from "./CarDetailsAdmin";


const CarDashboardAdmin: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { editMode, selectedCar } = rootStore.carStore;


  return (
    <div>

      <Grid>
        <Grid.Column width={10}>

          <CarList />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedCar && !editMode && (
            <CarDetailsAdmin />
          )}
          {editMode && (
            <CarForm
              key={(selectedCar && selectedCar.id) || 0}
              car={selectedCar!}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(CarDashboardAdmin);
