import React, { useState, useContext } from "react";
import { Segment, Form, Button, Input } from "semantic-ui-react";
import { ICar } from "../../../app/models/Car";
import { v4 as uuid } from "uuid";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import countries from "../../../app/common/Countries_Cities_DropDown/CountryCityData";
interface IProps {
  car: ICar;
}

const validate = combineValidators({
  name: isRequired('name'),
  description: isRequired('description'),
  price: isRequired('price'),
  options: isRequired('options'),
  country: isRequired('country'),
  city: isRequired('city')
})

export const CarForm: React.FC<IProps> = ({
  car: initialFormState,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {createCar, editCar, cancelFormOpen } = rootStore.carStore;


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
        CreatorName: ""
      };
    }
  };

  const [car, setCar] = useState<ICar>(initializeForm);

  const handleSubmit = () => {
    if (car.id.length === 0) {
      let newCar = {
        ...car,
        id: uuid(),
      };
      createCar(newCar);
    } else {
      editCar(car);
    }
  };

  const handleInputChange = (event: any, ) => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
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
    setCar({ ...car, [name]: value });
  }

  const handleCitySelect = (event: any) => {
    console.log("Selected city", event.target.value);
    const citiesSel = event.target.value;
    setSelectedCity(citiesSel);
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  }



  return (
    
    <Segment clearing >
      <Form onSubmit={handleSubmit} error {...validate()}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={car.name}
        />
        <Form.TextArea
          name="description"
          onChange={handleInputChange}
          rows={2}
          placeholder="Description"
          value={car.description}
        />

        <Form.Input

          onChange={handleInputChange}
          name="price"
          value={car.price}
          icon='dollar'

          placeholder='Price'
        />

        <Input
          label={{ basic: true, content: 'Options' }}
          labelPosition='right'
          name='options'
          onChange={handleInputChange}
          placeholder='Full or Basic'
          value={car.options}
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
