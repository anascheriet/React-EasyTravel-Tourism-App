export interface IHotel {
    id: string;
    name: string;
    description: string;
    adress: string;
    price: number | any;
    rooms: number | any;
    maxpeople: number | any;
    country: string;
    city: string;
    CreatorName: string | undefined;
    package: string
}