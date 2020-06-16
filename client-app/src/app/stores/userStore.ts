import { IUser, IUserFormValues } from "../models/User";
import { observable, computed, action } from "mobx";
import agent from "../../components/cars/api/agent";
import { history } from "../..";
import { RootStore } from "./rootStore";

export default class UserStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;
    @observable adminID: number | null = null;
    @observable loadingInitial = false;
    @observable adminList: IUserFormValues[] = [];
    @observable sudoadminList: IUserFormValues[] = [];

    @computed get isLoggedIn() { return !!this.user }

    @action register = async (values: IUserFormValues) => {
        try {
            if (this.isLoggedIn) {
                await agent.User.register(values);
                this.rootStore.modalStore.closeModal();
                history.push('/admins');
            }
            else {
                const user = await agent.User.register(values);
                this.rootStore.commonStore.setToken(user.token);
                this.user = user;
                this.rootStore.modalStore.closeModal();
                history.push('/cars');
            }

        } catch (error) {
            throw error;
        }
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            this.user = user;
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/cars');
        } catch (error) {
            throw error;
        }
    }

    @action emptyList = () => {
        this.adminList = [];
    }

    @action loadAdmins = async () => {
        this.loadingInitial = true;
        try {
            const admins = await agent.User.listadmins();
            admins.forEach((admin) => {
                this.adminList.push(admin);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    @action loadSudoAdmins = async () => {
        this.loadingInitial = true;
        try {
            const sudoadmins = await agent.User.listsudoadmins();
            sudoadmins.forEach((sudoadmin) => {
                this.sudoadminList.push(sudoadmin);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            this.user = user;
        } catch (error) {
            console.log(error);
        }
    }



    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }
}
