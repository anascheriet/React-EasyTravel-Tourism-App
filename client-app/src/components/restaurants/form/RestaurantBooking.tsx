import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IRestaurantBooking } from '../../../app/models/Restaurant';
import { RedirectingModal } from '../../../app/layout/RedirectingModal';
import { Form, Button, Header } from 'semantic-ui-react';

const RestaurantBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { createRestaurantBooking, restaurantBookingToAdd } = rootStore.restaurantStore;
    const { openModal } = rootStore.modalStore;

    const [restaurantb, setRestaurantb] = useState<IRestaurantBooking>(restaurantBookingToAdd!)

    const handleFormSubmit = () => {
        let newRestaurant = {
            ...restaurantb,
        };
        createRestaurantBooking(newRestaurant).then(() => openModal(<RedirectingModal />));
    }

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setRestaurantb({ ...restaurantb, [name]: value });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Header as='h2' content="Fill Your Booking Info" color='teal'
                textAlign='center' />
            <Form.Input label='Book This Restaurant For: ' onChange={handleInputChange} name="mealDate" type="date" value={restaurantb.mealDate} />
            <Form.Input label='Number Of People:' onChange={handleInputChange} name="people" type="text" value={restaurantb.people} />
            <select value={restaurantb.mealTime} onChange={handleInputChange} name="mealTime"
                style={{ marginTop: "1em" ,marginBottom:"1em" }}

            >
                <option selected disabled value="">Select Meal Time</option>
                <option key="B9" value="BreakFast at 09:00"> BreakFast at 09:00</option>
                <option key="B10" value="BreakFast at 10:00"> BreakFast at 10:00</option>
                <option key="B11" value="BreakFast at 11:00"> BreakFast at 11:00</option>
                <option key="L12" value="Lunch at 12:00"> Lunch at 12:00</option>
                <option key="L13" value="Lunch at 13:00"> Lunch at 13:00</option>
                <option key="L14" value="Lunch at 14:00"> Lunch at 14:00</option>
                <option key="L20" value="Dinner at 20:00"> Dinner at 20:00</option>
                <option key="L21" value="Dinner at 21:00"> Dinner at 21:00</option>
                <option key="L22" value="Dinner at 22:00"> Dinner at 22:00</option>
            </select>
            <Form.Input label='Product ID' onChange={handleInputChange} name="productid" value={restaurantb!.productId || ""} type="text"
            />
            <Button
                fluid
                color="orange"
                type="submit"
                content="Submit"
            // onClick={(() => openModal(<RedirectingModal />))}
            />

        </Form>
    )
}

export default observer(RestaurantBooking)
