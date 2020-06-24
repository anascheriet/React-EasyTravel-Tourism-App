import { RootStore } from "./rootStore";
import { IFlight, IFlightBooking } from "../models/Flight";
import { observable, computed, action } from "mobx";
import agent from "../../components/cars/api/agent";
import { SyntheticEvent, IframeHTMLAttributes } from "react";

export default class FlightStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable adminFlightList: IFlight[] = [];
    @observable clientFlightList: IFlight[] = [];
    @observable bookedFlightList: IFlightBooking[] = [];
    @observable selectedFlight: IFlight | undefined | null;
    @observable OfferedFlight: IFlight | undefined = undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';
    @observable flightBookingToAdd: IFlightBooking | undefined = {
        productId: "",
        adults: "",
        kids: ""
    };

    @computed get adminFlightsByPrice() {
        return this.adminFlightList.slice().sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    }

    @computed get clientFlightsByPrice() {
        return this.clientFlightList.slice().sort(
            (a, b) => Number(a.price) - Number(b.price)
        );
    }

    @computed get flightBookingsByDate(){
        return this.bookedFlightList.slice().sort(
          (a,b) => Date.parse(a.bookingDate!) - Date.parse(b.bookingDate!)
        );
      }

    @action loadAdminFlights = async (name: string | undefined) => {
        this.loadingInitial = true;
        try {
            const flights = await agent.Flights.adminFlights(name);
            flights.forEach((flight) => {
                this.adminFlightList.push(flight);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action loadClientFlightBookings = async (name: string | undefined) => {
        //let testArray: ICar [] = [];
        this.loadingInitial = true;
        try {
    
          const flightBs = await agent.Flights.listBookedFlights(name);
          flightBs.forEach((flightB) => {
            this.bookedFlightList.push(flightB);
          });
          this.loadingInitial = false;
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
      };

    @action loadAllFlights = async () => {
        this.loadingInitial = true;
        try {
            const flights = await agent.Flights.list();
            flights.forEach((flight) => {
                this.clientFlightList.push(flight);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action emptyAdminFlights = () => {
        this.adminFlightList = [];
    }

    @action emptyAllFlights = () => {
        this.clientFlightList = [];
    }

    @action emptyBookedFlight = () => {
        this.bookedFlightList = [];
    }

    @action createFlight = async (flight: IFlight) => {
        this.submitting = true;
        try {
            await agent.Flights.create(flight);
            this.adminFlightList.push(flight);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action createFlightBooking = async (flightBooking: IFlightBooking) => {
        this.submitting = true;
        try {
            this.flightBookingToAdd = flightBooking;
            await agent.Flights.createBooking(flightBooking);
            this.rootStore.modalStore.closeModal();
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };

    @action editFlight = async (flight: IFlight) => {
        this.submitting = true;
        try {
            await agent.Flights.update(flight);
            this.adminFlightList.splice(this.adminFlightList.findIndex(a => a.id === flight.id), 1);
            this.adminFlightList.push(flight);
            this.selectedFlight = flight;
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action deleteFlight = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Flights.delete(id);
            this.adminFlightList.splice(this.adminFlightList.findIndex(a => a.id === id), 1);
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
        this.selectedFlight = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedFlight = this.adminFlightList.find(a => a.id === id);
        this.editMode = true;
    }

    @action cancelSelectedFlight = () => {
        this.selectedFlight = undefined;
    }

    @action cancelOpenForm = () => {
        this.editMode = false;
    }

    @action selectFlight = (id: string) => {
        this.selectedFlight = this.adminFlightList.find(a => a.id === id);
        this.editMode = false;
    }

}