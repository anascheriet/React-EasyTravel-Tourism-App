import { observable, action, computed } from "mobx";
import { SyntheticEvent } from "react";
import { ICar, ICarBooking } from "../models/Car";
import agent from "../../components/cars/api/agent";
import { RootStore } from "./rootStore";


export default class CarStore {

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //@observable carRegistry = new Map();
  @observable adminCarList: ICar[] = [];
  @observable clientCarList: ICar[] = [];
  @observable selectedCar: ICar | undefined | null;
  @observable carBookingToAdd: ICarBooking | undefined = {  
    productid: "",
    startingfrom: undefined,
    endingDate: undefined
  };
  @observable OfferedCar: ICar | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get adminCarsByPrice() {
    return this.adminCarList.slice().sort(
      (a, b) => a.price - b.price
    );
  }

  @computed get ClientCarsByPrice() {
    return this.clientCarList.slice().sort(
      (a, b) => a.price - b.price
    );
  }

  @action loadAdminCars = async (name: string | undefined) => {
    //let testArray: ICar [] = [];
    this.loadingInitial = true;
    try {

      const cars = await agent.Cars.adminCars(name);
      cars.forEach((car) => {
        this.adminCarList.push(car);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };


  @action loadAllCars = async () => {
    //let testArray: ICar [] = [];
    this.loadingInitial = true;
    try {
      const cars = await agent.Cars.list();
      cars.forEach((car) => {
        this.clientCarList.push(car);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action emptyAdminCars = () => {
    this.adminCarList = [];
  }

  @action emptyAllCars = () => {
    this.clientCarList = [];
  }

  @action createCar = async (car: ICar) => {
    this.submitting = true;
    try {
      await agent.Cars.create(car);
      this.adminCarList.push(car);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action createCarBooking = async (carBooking: ICarBooking) => {
    this.submitting = true;
    try {
      this.carBookingToAdd = carBooking;
      await agent.Cars.createBooking(carBooking);
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };


  @action editCar = async (car: ICar) => {
    this.submitting = true;
    try {
      await agent.Cars.update(car);
      this.adminCarList.splice(this.adminCarList.findIndex(a => a.id === car.id), 1);
      this.adminCarList.push(car);
      this.selectedCar = car;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  }

  @action deleteCar = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Cars.delete(id);
      this.adminCarList.splice(this.adminCarList.findIndex(a => a.id === id), 1);
      this.submitting = false;
      this.target = '';
    } catch (error) {
      this.submitting = false;
      this.target = '';
      console.log(error);
    }
  }

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedCar = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedCar = this.adminCarList.find(a => a.id === id);
    this.editMode = true;
  }

  @action cancelSelectedCar = () => {
    this.selectedCar = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action selectCar = (id: string) => {
    this.selectedCar = this.adminCarList.find(a => a.id === id);
    this.editMode = false;
  };


}

