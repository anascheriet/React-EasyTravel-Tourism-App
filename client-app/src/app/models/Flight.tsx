export interface IFlight {
    id: string;
    name: string;
    type: string;
    price: string;

    departingCountry: string;
    departingCity: string;
    departingDepartingTime: string;
    departingArrivingTime: string;
    departingDate: Date | undefined;

    destinationCountry: string;
    destinationCity: string;

  
    returnArrivingTime: string;
    returnDepartingTime: string;
    returningDate: Date | undefined;
    
    creatorName: string | undefined;

    combinedDepLocation?: string;
    combinedDestination?: string
}

export interface IFlightBooking{
    flightBookingId?: number;
    adults: string;
    kids: string;
    productId: string;
    bookingDate?: string;
}