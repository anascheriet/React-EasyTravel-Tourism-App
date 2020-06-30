export interface ICar{
    id : string;
    name: string;
    description: string;
    price: string;
    options: string;
    country: string;
    city: string;
    creatorName: string;
}

export interface ICarBooking{
    carBookingId?: number;
    startingFromDate: Date | undefined;
    endingDate: Date | undefined;
    productId: string;
    bookingDate?: string;
}