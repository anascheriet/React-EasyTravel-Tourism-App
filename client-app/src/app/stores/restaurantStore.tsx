import React, { SyntheticEvent } from 'react'
import { RootStore } from './rootStore'
import { IRestaurant, IRestaurantBooking } from '../models/Restaurant';
import { observable, action, computed } from 'mobx';
import agent from '../../components/cars/api/agent';
export default class RestaurantStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable adminRestaurantList: IRestaurant[] = [];
    @observable clientRestaurantList: IRestaurant[] = [];
    @observable bookedRestaurantsList: IRestaurantBooking[] = [];
    @observable selectedRestaurant: IRestaurant | undefined | null;
    @observable OfferedRestaurant: IRestaurant | undefined = undefined;

    @observable restaurantBookingToAdd: IRestaurantBooking | undefined = {
        productId: "",
        mealDate: undefined,
        people: "",
        mealTime: ""
    };

    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    @computed get restaurantBookingsByDate(){
        return this.bookedRestaurantsList.slice().sort(
          (a,b) => Date.parse(a.bookingDate!) - Date.parse(b.bookingDate!)
        );
      }


    @action loadAdminRestaurants = async (name: string | undefined) => {
        this.loadingInitial = true;
        try {
            const restaurants = await agent.Restaurants.adminRestaurants(name);
            restaurants.forEach((restaurant) => {
                this.adminRestaurantList.push(restaurant);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action loadClientRestaurantBookings = async (name: string | undefined) => {
        //let testArray: ICar [] = [];
        this.loadingInitial = true;
        try {
    
          const RestaurantsBs = await agent.Restaurants.listBookedRestaurants(name);
          RestaurantsBs.forEach((RestaurantB) => {
            this.bookedRestaurantsList.push(RestaurantB);
          });
          this.loadingInitial = false;
        } catch (error) {
          console.log(error);
          this.loadingInitial = false;
        }
      };

    @action loadAllRestaurants = async () => {
        this.loadingInitial = true;
        try {
            const restaurants = await agent.Restaurants.list();
            restaurants.forEach((restaurant) => {
                this.clientRestaurantList.push(restaurant);
            });
            this.loadingInitial = false;
        } catch (error) {
            this.loadingInitial = false;
        }
    };

    @action loadOfferedRestaurant = async (id: string) => {
        let restaurant = this.clientRestaurantList.find(x => x.id === id);
        if (restaurant) {
            this.OfferedRestaurant = restaurant;
        }
        else
            try {
                restaurant = await agent.Restaurants.details(id);
                this.OfferedRestaurant = restaurant;
            } catch (error) {
                console.log(error);
            }
    }

    @action emptyAdminRestaurants = () => {
        this.adminRestaurantList = [];
    }

    @action emptyClientBookings = () => {
        this.bookedRestaurantsList = [];
    }

    @action emptyAllRestaurants = () => {
        this.clientRestaurantList = [];
    }

    @action createRestaurant = async (restaurant: IRestaurant) => {
        this.submitting = true;
        try {
            await agent.Restaurants.create(restaurant);
            this.adminRestaurantList.push(restaurant);
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action createRestaurantBooking = async (restaurantBooking: IRestaurantBooking) => {
        this.submitting = true;
        try {
            this.restaurantBookingToAdd = restaurantBooking;
            await agent.Restaurants.createBooking(restaurantBooking);
            this.rootStore.modalStore.closeModal();
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    };


    @action editRestaurant = async (restaurant: IRestaurant) => {
        this.submitting = true;
        try {
            await agent.Restaurants.update(restaurant);
            this.adminRestaurantList.splice(this.adminRestaurantList.findIndex(a => a.id === restaurant.id), 1);
            this.adminRestaurantList.push(restaurant);
            this.selectedRestaurant = restaurant;
            this.editMode = false;
            this.submitting = false;
        } catch (error) {
            this.submitting = false;
            console.log(error);
        }
    }

    @action deleteRestaurant = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Restaurants.delete(id);
            this.adminRestaurantList.splice(this.adminRestaurantList.findIndex(a => a.id === id), 1);
            this.submitting = false;
            this.target = '';
        } catch (error) {
            this.submitting = false;
            this.target = '';
            console.log(error);
        }
    }

    @action deleteRestaurantBooking = async (id: number) => {
        this.submitting = true;
        try {
          await agent.Restaurants.deleteBooking(id);
          this.bookedRestaurantsList.splice(this.bookedRestaurantsList.findIndex(a => a.restaurantBookingId === id), 1);
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
        this.selectedRestaurant = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedRestaurant = this.adminRestaurantList.find(a => a.id === id);
        this.editMode = true;
    }

    @action cancelSelectedRestaurant = () => {
        this.selectedRestaurant = undefined;
    }

    @action cancelOpenForm = () => {
        this.editMode = false;
    }

    @action selectRestaurant = (id: string) => {
        this.selectedRestaurant = this.adminRestaurantList.find(a => a.id === id);
        this.editMode = false;
    }
}