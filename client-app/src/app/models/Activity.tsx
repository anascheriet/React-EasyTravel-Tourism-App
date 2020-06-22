export interface IActivity{
    id : string;
    name: string;
    description: string;
    adress: string;
    price: string;
    package: string;
    country: string;
    city: string;
    duration : string;
    CreatorName: string;
}

export interface IActivityBooking{
    adults: string;
    kids: string;
    productid: string;
    activityDate: Date | undefined;
}