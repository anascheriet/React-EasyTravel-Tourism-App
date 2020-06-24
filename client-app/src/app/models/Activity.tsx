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
    productId: string;
    activityDate: Date | undefined;
    bookingDate?: string;
}