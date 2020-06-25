export interface IRestaurant {
    id: string;
    name: string;
    description: string;
    adress: string;
    meals: string;
    phoneNumber: string;
    country: string;
    city: string;
    CreatorName: string | undefined;
}

export interface IRestaurantBooking {
    restaurantBookingId?: number;
    people: string;
    productId: string;
    mealTime: string;
    mealDate: Date | undefined;
    bookingDate?: string;
}