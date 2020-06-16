export interface ICar{
    id : string;
    name: string;
    description: string;
    price: number | any;
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