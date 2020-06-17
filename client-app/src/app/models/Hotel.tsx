export interface IHotel {
    id: string;
    name: string;
    description: string;
    adress: string;
    price: number | any;
    rooms: number | any;
    people: number | any;
    country: string;
    city: string;
    CreatorName: string | undefined;
    package: string
}