import React, { useContext, useState } from 'react'
import { IHotel } from '../../../app/models/Hotel'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from "uuid";
import countries from '../../../app/common/Countries_Cities_DropDown/CountryCityData';
import { Segment, Form, Button } from 'semantic-ui-react';

interface IProps {
    hotel: IHotel;
}

export const HotelForm: React.FC<IProps> = ({
    hotel: initialFormState,
}) => {
    const rootStore = useContext(RootStoreContext);
    const { createHotel, editHotel, cancelOpenForm } = rootStore.hotelStore;
    const { user } = rootStore.userStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                name: "",
                description: "",
                price: "",
                rooms: "",
                people: "",
                options: "",
                country: "",
                city: "",
                CreatorName: "",
                adress: "",
                package: "",
            };
        }
    };

    const [hotel, setHotel] = useState<IHotel>(initializeForm);

    const handleSubmit = () => {
        if (hotel.id.length === 0) {
            let newHotel = {
                ...hotel,
                id: uuid(),
            };
            createHotel(newHotel);
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


    hotel!.CreatorName = user?.displayName;

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
                <Form.Input
                    onChange={handleInputChange}
                    name="rooms"
                    value={hotel.rooms}
                    placeholder='Number Of Rooms'
                />
                <Form.Input
                    onChange={handleInputChange}
                    name="people"
                    value={hotel.people}
                    placeholder='Maximum Number Of People'
                />

                <Form.Input
                    name='adress'
                    onChange={handleInputChange}
                    placeholder='Adress'
                    value={hotel.adress}
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
                <select value={hotel.package} onChange={handleInputChange} name="package"
                    style={{ marginTop: "1em" }}

                >
                    <option selected disabled value="">Select Package Options</option>
                    <option key="PP" value="Parking, Spa, Gym & Pool"> Parking, Spa, Gym & Pool</option>
                    <option key="SP" value="Parking & Pool"> Parking & Pool</option>
                    <option key="BP" value="Parking">Parking</option>

                </select>
                <Button
                    style={{ marginTop: "0.7em" }}
                    floated="right"
                    positive
                    type="submit"
                    onClick={(() => console.log(hotel.CreatorName, hotel.package))}
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
    );
};
