import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IFlightBooking } from '../../../app/models/Flight';
import { RedirectingModal } from '../../../app/layout/RedirectingModal';
import { Form, Header, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const FlightBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { createFlightBooking, flightBookingToAdd } = rootStore.flightStore;
    const { openModal } = rootStore.modalStore;

    const [flightb, setFlightb] = useState<IFlightBooking>(flightBookingToAdd!)

    const handleFormSubmit = () => {
        let newFlightb = {
            ...flightb,
        };
        createFlightBooking(newFlightb).then(() => openModal(<RedirectingModal />));

    }
    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setFlightb({ ...flightb, [name]: value });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
        <Header as='h2' content="Choose Your Booking Duration " color='teal'
            textAlign='center' />
        <Form.Input label='Adults:' onChange={handleInputChange} name="adults" type="text" value={flightb.adults} />
        <Form.Input label='Kids:' onChange={handleInputChange} name="kids" value={flightb.kids} type="text"
        />
        <Form.Input label='Ticket ID' onChange={handleInputChange} name="productid" value={flightb!.productid || ""} type="text"
        />
        <Button
            fluid
            color="orange"
            type="submit"
            content="Submit"
        />

    </Form>
    )
}

export default observer(FlightBooking)
