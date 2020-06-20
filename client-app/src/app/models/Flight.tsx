export interface IFlight {
    id: string;
    name: string;
    type: string;
    price: number | any;

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
    
    CreatorName: string | undefined;

    combinedDepLocation?: string;
    combinedDestination?: string
}