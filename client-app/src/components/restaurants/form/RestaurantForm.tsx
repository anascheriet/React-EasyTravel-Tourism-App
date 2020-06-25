import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IRestaurant } from '../../../app/models/Restaurant';
import countries from '../../../app/common/Countries_Cities_DropDown/CountryCityData';
import { v4 as uuid } from "uuid";
import { Form, Segment, Button } from 'semantic-ui-react';

interface IProps {
    restaurant: IRestaurant;
}

export const RestaurantForm: React.FC<IProps> = ({
    restaurant: initialFormState,
}) => {
    const rootStore = useContext(RootStoreContext);
    const { createRestaurant, editRestaurant, cancelOpenForm } = rootStore.restaurantStore;
    const { user } = rootStore.userStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                name: "",
                description: "",
                meals: "",
                options: "",
                country: "",
                city: "",
                CreatorName: "",
                adress: "",
                phoneNumber: "",
            };
        }
    };

    const [restaurant, setRestaurant] = useState<IRestaurant>(initializeForm);

    const handleSubmit = () => {
        if (restaurant.id.length === 0) {
            let newRestaurant = {
                ...restaurant,
                id: uuid(),
            };
            createRestaurant(newRestaurant);
        }
        else {
            editRestaurant(restaurant);
        }
    };

    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value });
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
        setRestaurant({ ...restaurant, [name]: value });
    }

    const handleCitySelect = (event: any) => {
        console.log("Selected city", event.target.value);
        const citiesSel = event.target.value;
        setSelectedCity(citiesSel);
        const { name, value } = event.target;
        setRestaurant({ ...restaurant, [name]: value });
    }


    restaurant!.CreatorName = user?.displayName;


    return (
        <Segment clearing >
        <Form onSubmit={handleSubmit} >
            <Form.Input
                onChange={handleInputChange}
                name="name"
                placeholder="Name"
                value={restaurant.name}
            />
            <Form.TextArea
                name="description"
                onChange={handleInputChange}
                rows={2}
                placeholder="Description"
                value={restaurant.description}
            />

            <Form.Input

                onChange={handleInputChange}
                name="phoneNumber"
                value={restaurant.phoneNumber}
                icon='phone'
                placeholder='Phone Number'
            />

            <Form.Input
                name='adress'
                onChange={handleInputChange}
                placeholder='Adress'
                value={restaurant.adress}
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
            <select value={restaurant.meals} onChange={handleInputChange} name="meals"
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
