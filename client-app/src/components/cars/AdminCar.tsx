import { useEffect, useContext } from "react";

import React from "react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from "../../app/stores/rootStore";
import CarDashboardAdmin from "./dashboard/admin/CarDashboardAdmin";

const AdminCar = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadAdminCars, emptyAdminCars, loadingInitial } = rootStore.carStore;
  const { user } = rootStore.userStore;
  useEffect(() => {
    //console.log("useEffect");
    //if(carStore.cars.length === 0){
    
    //user?.status==="Client" ? (loadAllCars()) : (loadAdminCars(user?.displayName));
    loadAdminCars(user?.username);
    emptyAdminCars();
    //empty the array so it can be re-loaded --to be updated
  }, [loadAdminCars, emptyAdminCars, user]);

  if (loadingInitial) return <LoadingComponent content="Loading Cars..." />;

  return (
    <div>

        <CarDashboardAdmin/>
        
    </div>
  );
};

export default observer(AdminCar);
