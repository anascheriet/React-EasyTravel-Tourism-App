import { RootStore } from "./rootStore";
import { observable, computed, action } from "mobx";
import { IHotel, IHotelBooking } from "../models/Hotel";
import agent from "../../components/cars/api/agent";
import { SyntheticEvent } from "react";

export default class HotelStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable adminHotelList: IHotel[] = [];
    @observable clientHotelList: IHotel[] = [];
    @observable selectedHotel: IHotel | undefined | null;
    @observable OfferedHotel: IHotel | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';
    @observable hotelBookingToAdd: IHotelBooking | undefined = {
        productid: "",
        startingfrom: undefined,
        endingDate: undefined
    };

    @computed get adminHotelsByPrice() {
        return this.adminHotelList.slice().sort(
            (a, b) => a.price - b.price
        );
    }

    @computed get clientHotelsByPrice() {
        return this.clientHotelList.slice().sort(
            (a, b) => a.price - b.price
        );
    }

    @action loadAdminHotels = async (name: string | undefined) => {
        this.loadingInitial = true;
        try {
            const hotels = await agent.Hotels.adminHotels(name);
            hotels.forEach((hotel) => {
                this.adminHotelList.push(hotel);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action loadAllHotels = async () => {
        this.loadingInitial = true;
        try {
            const hotels = await agent.Hotels.list();
            hotels.forEach((hotel) => {
                this.clientHotelList.push(hotel);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action loadOfferedHotel = async (id: string) => {
        let hotel = this.clientHotelList.find(x => x.id === id);
        if (hotel) {
            this.OfferedHotel = hotel;
        }
        else
            try {
                hotel = await agent.Hotels.details(id);
                this.OfferedHotel = hotel;
            } catch (error) {
                console.log(error);
            }
    }

    @action emptyAdminHotels = () => {
        this.adminHotelList = [];
    }

    @action emptyAllHotels = () => {
        this.clientHotelList = [];
    }

    @action createHotel = async (hotel: IHotel) => {
        this.submitting = true;
        try {
            await agent.Hotels.create(hotel);
            this.adminHotelList.push(hotel);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action createHotelBooking = async (hotelBooking: IHotelBooking) => {
        this.submitting = true;
        try {
            this.hotelBookingToAdd = hotelBooking;
            await agent.Hotels.createBooking(hotelBooking);
            this.rootStore.modalStore.closeModal();
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };



    @action editHotel = async (hotel: IHotel) => {
        this.submitting = true;
        try {
            await agent.Hotels.update(hotel);
            this.adminHotelList.splice(this.adminHotelList.findIndex(a => a.id === hotel.id), 1);
            this.adminHotelList.push(hotel);
            this.selectedHotel = hotel;
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action deleteHotel = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Hotels.delete(id);
            this.adminHotelList.splice(this.adminHotelList.findIndex(a => a.id === id), 1);
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
        this.selectedHotel = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedHotel = this.adminHotelList.find(a => a.id === id);
        this.editMode = true;
    }

    @action cancelSelectedHotel = () => {
        this.selectedHotel = undefined;
    }

    @action cancelOpenForm = () => {
        this.editMode = false;
    }

    @action selectHotel = (id: string) => {
        this.selectedHotel = this.adminHotelList.find(a => a.id === id);
        this.editMode = false;
    }






}