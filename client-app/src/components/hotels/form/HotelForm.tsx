import React, { useContext, useState } from 'react'
import { IHotel } from '../../../app/models/Hotel'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from "uuid";
import countries from '../../../app/common/Countries_Cities_DropDown/CountryCityData';
import { Segment, Form, Input, Button } from 'semantic-ui-react';

interface IProps {
    hotel: IHotel;
}

export const HotelForm: React.FC<IProps> = ({
    hotel: initialFormState,
}) => {
    const rootStore = useContext(RootStoreContext);
    const { createHotel, editHotel, cancelOpenForm } = rootStore.hotelStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                name: "",
                description: "",
                price: "",
                options: "",
                country: "",
                city: "",
                CreatorName: "",
                adress: "",
                hasPool: "",
                hasParking: "",
                hasSpa: "",
                hasGym: ""
            };
        }
    };

    const [hotel, setHotel] = useState<IHotel>(initialFormState);

    const handleSubmit = () => {
        if (hotel.id.length === 0) {
            let newHotel = {
                ...hotel,
                id: uuid(),
            };
            createHotel(hotel);
        }
        else {
            editHotel(hotel);
        }
    };

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setHotel({ ...hotel, [name]: value });
    };

    const [cities, setcities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countryList = Object.keys(countries).map(key => ({
        name: key
    }));

    const handleCountrySelect = (event: any) => {

        console.log("Selected country", event.target.value);
        const countrySel = event.target.value;
        const citiesSel = countrySel !== "" ? countries[countrySel] : "";
        setSelectedCountry(countrySel);
        setcities(citiesSel);
        setSelectedCity("");
        const { name, value } = event.target;
        setHotel({ ...hotel, [name]: value });
    }

    const handleCitySelect = (event: any) => {
        console.log("Selected city", event.target.value);
        const citiesSel = event.target.value;
        setSelectedCity(citiesSel);
        const { name, value } = event.target;
        setHotel({ ...hotel, [name]: value });
    }




    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit} >
                <Form.Input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Name"
                    value={hotel.name}
                />
                <Form.TextArea
                    name="description"
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Description"
                    value={hotel.description}
                />

                <Form.Input

                    onChange={handleInputChange}
                    name="price"
                    value={hotel.price}
                    icon='dollar'

                    placeholder='Price'
                />

                <Input
                    label={{ basic: true, content: 'Options' }}
                    labelPosition='right'
                    name='options'
                    onChange={handleInputChange}
                    placeholder='Full or Basic'
                    value={hotel.adress}
                    fluid
                />


                <select name="country"
                    style={{ marginTop: "1em" }}
                    onChange={e => handleCountrySelect(e)}
                    value={selectedCountry}
                >
                    <option value="">Select a Country</option>
                    {countryList.map((country, key) => {
                        return <option key={key} value={country.name}>
                            {country.name}
                        </option>
                    })}
                </select>
                <select name="city"
                    style={{ marginTop: "1em" }}
                    onChange={e => handleCitySelect(e)}
                    value={selectedCity}
                >
                    <option value="">Select a city</option>
                    {cities.map((city, key) => {
                        return <option key={key} value={city}>
                            {city}
                        </option>
                    })}

                </select>



                <Button
                    style={{ marginTop: "0.7em" }}
                    floated="right"
                    positive
                    type="submit"
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
