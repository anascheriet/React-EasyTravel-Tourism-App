import { observable, action, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore;


    constructor(rootStore: RootStore){
        this.rootStore = rootStore;

        reaction(() => this.token,
        token =>{
            if(token) {
                window.localStorage.setItem('jwt', token);
            } else {
                window.localStorage.removeItem('jwt');
            }
        })
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }

    dateDiffInDays = (a: Date, b: Date) =>  {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }
}