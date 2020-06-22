import React, { useContext, useState } from 'react'
import { IActivity } from '../../../app/models/Activity'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { v4 as uuid } from "uuid";
import countries from '../../../app/common/Countries_Cities_DropDown/CountryCityData';
import { Segment, Form, Input, Button } from 'semantic-ui-react';

interface IProps {
    activity: IActivity;
}
export const ActitvityForm: React.FC<IProps> = (
    {
        activity: initialFormState,
    }
) => {
    const rootStore = useContext(RootStoreContext);
    const { createActivity, editActivity, cancelFormOpen } = rootStore.activityStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: "",
                name: "",
                description: "",
                price: "",
                package: "",
                adress: "",
                country: "",
                duration: "",
                city: "",
                CreatorName: ""
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };


    const handleInputChange = (event: any,) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
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
        setActivity({ ...activity, [name]: value });
    }

    const handleCitySelect = (event: any) => {
        console.log("Selected city", event.target.value);
        const citiesSel = event.target.value;
        setSelectedCity(citiesSel);
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }
    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Name"
                    value={activity.name}
                />
                <Form.TextArea
                    name="description"
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Description"
                    value={activity.description}
                />

                <Form.Input

                    onChange={handleInputChange}
                    name="price"
                    value={String(activity.price)}
                    icon='dollar'
                    placeholder='Price'
                />
                 <Form.Input
                    name='duration'
                    onChange={handleInputChange}
                    placeholder='Activity Duration'
                    value={activity.duration}
                    fluid
                />

                <Form.Input
                    name='package'
                    onChange={handleInputChange}
                    placeholder='Features'
                    value={activity.package}
                    fluid
                />
                 <Form.Input
                    name='adress'
                    onChange={handleInputChange}
                    placeholder='Activity Adress'
                    value={activity.adress}
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
                    onClick={cancelFormOpen}
                    floated="right"
                    type="button"
                    content="Cancel"
                />
            </Form>
        </Segment>
    );
};
