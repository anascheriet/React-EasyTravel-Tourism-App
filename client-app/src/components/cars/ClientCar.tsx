import { useEffect, useContext } from "react";

import React from "react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "../../app/stores/rootStore";
import { CarListClient } from "./dashboard/Client/CarListClient";


const ClientCar = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadAllCars, emptyAllCars, loadingInitial } = rootStore.carStore;
  useEffect(() => {
    //console.log("useEffect");
    //if(carStore.cars.length === 0){
    loadAllCars();
    emptyAllCars();
    //user?.status==="Client" ? (loadAllCars()) : (loadAdminCars(user?.displayName));

    //empty the array so it can be re-loaded --to be updated
  }, [loadAllCars, emptyAllCars]);

  if (loadingInitial) return <LoadingComponent content="Loading Cars..." />;

  return (
    <div>

      <CarListClient />

    </div>
  );
};

export default observer(ClientCar);
