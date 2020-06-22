import CarStore from './carStore';
import UserStore from './userStore';
import { createContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import HotelStore from './hotelStore';
import FlightStore from './flightStore';
import ActivityStore from './activityStore';

export class RootStore {
    carStore: CarStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    hotelStore: HotelStore;
    flightStore: FlightStore;
    activityStore: ActivityStore;

    constructor(){
        this.carStore = new CarStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.hotelStore = new HotelStore(this);
        this.flightStore = new FlightStore(this);
        this.activityStore = new ActivityStore(this);
    }
}

export const RootStoreContext= createContext(new RootStore());