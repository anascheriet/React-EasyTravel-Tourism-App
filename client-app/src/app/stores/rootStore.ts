import CarStore from './carStore';
import UserStore from './userStore';
import { createContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import HotelStore from './hotelStore';

export class RootStore {
    carStore: CarStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    hotelStore: HotelStore;

    constructor(){
        this.carStore = new CarStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.hotelStore = new HotelStore(this);
    }
}

export const RootStoreContext= createContext(new RootStore());