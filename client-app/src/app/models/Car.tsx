export interface ICar{
    id : string;
    name: string;
    description: string;
    price: string;
    options: string;
    country: string;
    city: string;
    CreatorName: string;
}

export interface ICarBooking{
    startingfrom: Date | undefined;
    endingDate: Date | undefined;
    productid: string;
}