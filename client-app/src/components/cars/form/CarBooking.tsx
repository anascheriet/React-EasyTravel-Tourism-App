import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore'
import { Form, Button, Header } from 'semantic-ui-react'
import { ICarBooking } from '../../../app/models/Car'

import { observer } from 'mobx-react-lite'
import { RedirectingModal } from '../../../app/layout/RedirectingModal'


const CarBooking = () => {
    const rootStore = useContext(RootStoreContext);
    const { createCarBooking, carBookingToAdd } = rootStore.carStore;
    const { openModal } = rootStore.modalStore;

    const [carb, setCarb] = useState<ICarBooking>(carBookingToAdd!)

    // {(carbooking: ICarBooking) => createCarBooking(carbooking).catch(error => ({
    //     [FORM_ERROR]: error
    // }))}

    const handleFormSubmit = () => {
        let newCar = {
            ...carb,
        };
        createCarBooking(newCar).then(() => openModal(<RedirectingModal />));

    }

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setCarb({ ...carb, [name]: value });
    };
    return (


        <Form onSubmit={handleFormSubmit}>
            <Header as='h2' content="Choose Your Booking Duration " color='teal'
                textAlign='center' />
            <Form.Input label='Starting From: ' onChange={handleInputChange} name="StartingFromDate" type="date" value={carb!.startingfrom} />
            <Form.Input label='Until: ' onChange={handleInputChange} name="EndingDate" value={carb!.endingDate} type="date"
            />
            <Form.Input label='Product ID' onChange={handleInputChange} name="productid" value={carb!.productid || ""} type="text"
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

export default observer(CarBooking);