import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IHotelBooking } from '../../../app/models/Hotel';
import { RedirectingModal } from '../../../app/layout/RedirectingModal';
import { Form, Button, Header } from 'semantic-ui-react';

const HotelBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { createHotelBooking, hotelBookingToAdd } = rootStore.hotelStore;
    const { openModal } = rootStore.modalStore;

    const [hotelb, setHotelb] = useState<IHotelBooking>(hotelBookingToAdd!)

    const handleFormSubmit = () => {
        let newHotelb = {
            ...hotelb,
        };
        createHotelBooking(newHotelb).then(() => openModal(<RedirectingModal />));

    }
    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setHotelb({ ...hotelb, [name]: value });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Header as='h2' content="Choose Your Booking Duration " color='teal'
                textAlign='center' />
            <Form.Input label='Starting From: ' onChange={handleInputChange} name="StartingFromDate" type="date" value={hotelb!.startingFromDate} />
            <Form.Input label='Until: ' onChange={handleInputChange} name="EndingDate" value={hotelb!.endingDate} type="date"
            />
            <Form.Input label='Product ID' onChange={handleInputChange} name="productId" value={hotelb!.productId || ""} type="text"
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
export default observer(HotelBooking)