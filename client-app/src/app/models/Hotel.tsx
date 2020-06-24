export interface IHotel {
    id: string;
    name: string;
    description: string;
    adress: string;
    price: string;
    rooms: string;
    people: string;
    country: string;
    city: string;
    CreatorName: string | undefined;
    package: string
}

export interface IHotelBooking{
    startingFromDate: Date | undefined;
    endingDate: Date | undefined;
    productId: string;
    bookingDate?: string;
}