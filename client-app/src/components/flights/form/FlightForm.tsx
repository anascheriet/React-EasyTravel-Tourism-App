import { IFlight } from "../../../app/models/Flight";
import { v4 as uuid } from "uuid";
import React, { useContext, useState } from 'react'
import { RootStoreContext } from "../../../app/stores/rootStore";
import countries from "../../../app/common/Countries_Cities_DropDown/CountryCityData";
import { Segment, Form, Button, Header, Icon, Label } from "semantic-ui-react";


interface IProps {
    flight: IFlight;
}

export const FlightForm: React.FC<IProps> = ({
    flight: initialFormState,
}) => {
    const rootStore = useContext(RootStoreContext);
    const { createFlight, editFlight, cancelOpenForm } = rootStore.flightStore;
    const { user } = rootStore.userStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                price: "",
                type: "",
                name: "",

                departingCountry: "",
                departingCity: "",
                departingDepartingTime: "",
                departingArrivingTime: "",
                departingDate: undefined,


                destinationCountry: "",
                destinationCity: "",

                returnDepartingTime: "",
                returnArrivingTime: "",
                returningDate: undefined,

                CreatorName: "",
            };
        }
    };

    const [flight, setFlight] = useState<IFlight>(initializeForm);

    const handleSubmit = () => {
        if (flight.id.length === 0) {
            let newFlight = {
                ...flight,
                id: uuid(),
            };
            createFlight(newFlight);
        }
        else {
            editFlight(flight);
        }
    };



    const [citiesDep, setcitiesDep] = useState([]);
    const [citiesArr, setcitiesArr] = useState([]);
    const [departingCountry, setDepartingCountry] = useState("");
    const [departingCity, setDepartingCity] = useState("");
    const [arrivingCountry, setArrivingCountry] = useState("");
    const [arrivingCity, setArrivingCity] = useState("");

    const countryList = Object.keys(countries).map(key => ({
        name: key
    }));

    const handleCountryDep = (event: any) => {

        console.log("Departing country", event.target.value);
        const countryDep = event.target.value;
        const citiesDep = countryDep !== "" ? countries[countryDep] : "";
        setDepartingCountry(countryDep);
        setcitiesDep(citiesDep);
        setDepartingCity("");
        const { name, value } = event.target;
        setFlight({ ...flight, [name]: value });
    }

    const handleCityDep = (event: any) => {
        console.log("Departing city", event.target.value);
        const citiesDep = event.target.value;
        setDepartingCity(citiesDep);
        const { name, value } = event.target;
        setFlight({ ...flight, [name]: value });
    }


    const handleCountryArr = (event: any) => {

        console.log("Arriving country", event.target.value);
        const countryArr = event.target.value;
        const citiesArr = countryArr !== "" ? countries[countryArr] : "";
        setArrivingCountry(countryArr);
        setcitiesArr(citiesArr);
        setArrivingCity("");
        const { name, value } = event.target;
        setFlight({ ...flight, [name]: value });
    }

    const handleCityArr = (event: any) => {
        console.log("Arriving city", event.target.value);
        const citiesArr = event.target.value;
        setArrivingCity(citiesArr);
        const { name, value } = event.target;
        setFlight({ ...flight, [name]: value });
    }

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setFlight({ ...flight, [name]: value });
    };




    flight!.CreatorName = user?.displayName;


    return (
        <Segment clearing >

            <Header as='h4'><Icon name="attention" />All Time Inputs Should be in 24H Format : HH:MM</Header>
            <Form onSubmit={handleSubmit} >
                <select defaultValue={flight.type} onChange={handleInputChange} name="type"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                >
                    <option selected disabled value="">Ticket Type</option>
                    <option key="OWT" value="One Way Ticket"> One Way Ticket</option>
                    <option key="RT" value="Round Trip"> Round Trip</option>

                </select>
                <Form.Input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Company Name"
                    defaultValue={flight.name}
                />
                <Form.Input

                    onChange={handleInputChange}
                    name="price"
                    value={flight.price}
                    icon='dollar'
                    placeholder='Price'
                />


                <Form.Input label='Departing Date: '
                    onChange={handleInputChange}
                    name="departingdate"
                    defaultValue={flight.departingDate}
                    type="date"
                />

                <Form.Input
                    onChange={handleInputChange}
                    name="departingdepartingtime"
                    defaultValue={flight.departingDepartingTime}
                    icon='clock'
                    placeholder='Departing Time'
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="departingarrivingtime"
                    defaultValue={flight.departingArrivingTime}
                    icon='clock'
                    placeholder='Arriving Time'
                />

                <select name="departingcountry"
                    style={{ marginTop: "1em" }}
                    onChange={e => handleCountryDep(e)}
                    defaultValue={departingCountry}
                >
                    <option value="">Select The departing Country</option>
                    {countryList.map((country, key) => {
                        return <option key={key} value={country.name}>
                            {country.name}
                        </option>
                    })}
                </select>

                <select name="departingcity"
                    style={{ marginTop: "1em", marginBottom: "1em" }}
                    onChange={e => handleCityDep(e)}
                    defaultValue={departingCity}
                >
                    <option value="">Select The departing City</option>
                    {citiesDep.map((city, key) => {
                        return <option key={key} value={city}>
                            {city}
                        </option>
                    })}

                </select>

                <select name="destinationcountry"
                    style={{ marginTop: "1em" }}
                    onChange={e => handleCountryArr(e)}
                    defaultValue={arrivingCountry}
                >
                    <option value="">Select The Destination Country</option>
                    {countryList.map((country, key) => {
                        return <option key={key} value={country.name}>
                            {country.name}
                        </option>
                    })}
                </select>

                <select name="destinationcity"
                    style={{ marginTop: "1em", marginBottom: "0.5em" }}
                    onChange={e => handleCityArr(e)}
                    defaultValue={arrivingCity}
                >
                    <option value="">Select The Destination City</option>
                    {citiesArr.map((city, key) => {
                        return <option key={key} value={city}>
                            {city}
                        </option>
                    })}

                </select>

                {flight.type === "Round Trip" &&

                    <div>
                        <Header dividing style={{ marginTop: "0.5em", marginBottom: "0.5em" }} />
                        <Header as='h3'>Return Flight:</Header>
                        <Form.Input label='Returning Date: '
                            onChange={handleInputChange}
                            name="returningdate"
                            defaultValue={flight.returningDate}
                            type="date"
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name="returnDepartingTime"
                            defaultValue={flight.returnDepartingTime}
                            icon='clock'
                            placeholder='Departing Time'
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name="returnArrivingTime"
                            defaultValue={flight.returnArrivingTime}
                            icon='clock'
                            placeholder='Arriving Time'
                        /> 


                    </div>}

                <Button
                    style={{ marginTop: "0.7em" }}
                    floated="right"
                    positive
                    type="submit"
                    onClick={(() => console.log(flight.returnDepartingTime))}
                    content="Submit" />
                <Button
                    style={{ marginTop: "0.7em" }}
                    onClick={cancelOpenForm}
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    )
}
