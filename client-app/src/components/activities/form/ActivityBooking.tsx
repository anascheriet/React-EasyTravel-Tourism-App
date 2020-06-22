import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IActivityBooking } from '../../../app/models/Activity';
import { RedirectingModal } from '../../../app/layout/RedirectingModal';
import { Header, Form, Button } from 'semantic-ui-react';

const ActivityBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { createActivityBooking, activityBookingToAdd } = rootStore.activityStore;
    const { openModal } = rootStore.modalStore;

    const [activityb, setActivityb] = useState<IActivityBooking>(activityBookingToAdd!)

    const handleFormSubmit = () => {
        let newActivity = {
            ...activityb,
        };
        createActivityBooking(newActivity).then(() => openModal(<RedirectingModal />));

    }

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setActivityb({ ...activityb, [name]: value });
    };
    return (

        <Form onSubmit={handleFormSubmit}>
            <Header as='h2' content="Choose Your Booking Duration " color='teal'
                textAlign='center' />
            <Form.Input label='Book This Activity For: ' onChange={handleInputChange} name="activityDate" type="date" value={activityb.activityDate} />
            <Form.Input label='Adults:' onChange={handleInputChange} name="adults" type="text" value={activityb.adults} />
            <Form.Input label='Kids:' onChange={handleInputChange} name="kids" value={activityb.kids} type="text"
            />
            <Form.Input label='Product ID' onChange={handleInputChange} name="productid" value={activityb!.productid || ""} type="text"
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

export default ActivityBooking
