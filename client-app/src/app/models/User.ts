export interface IUser {

    username: string;
    displayName: string;
    status: string;
    token: string;

}

export interface IUserFormValues{
    email?: string;
    password?: string;
    displayName?: string;
    username?: string;
    status: string;
}