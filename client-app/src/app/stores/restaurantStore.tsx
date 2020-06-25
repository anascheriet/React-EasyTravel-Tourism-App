import React, { SyntheticEvent } from 'react'
import { RootStore } from './rootStore'
import { IRestaurant } from '../models/Restaurant';
import { observable, action } from 'mobx';
import agent from '../../components/cars/api/agent';
export default class RestaurantStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable adminRestaurantList: IRestaurant[] = [];
    @observable clientRestaurantList: IRestaurant[] = [];
    @observable selectedRestaurant: IRestaurant | undefined | null;

    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


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

    @action emptyAdminRestaurants = () => {
        this.adminRestaurantList = [];
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