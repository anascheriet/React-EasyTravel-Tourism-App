import React, { useState, useEffect } from 'react'
import countries from './CountryCityData';

export const CountriesCities = () => {


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
    }

    const handleCitySelect = (event: any) => {
        console.log("Selected city", event.target.value);
        const citiesSel = event.target.value;
        setSelectedCity(citiesSel);
    }


    return (
        <div className="Container">
            <select name="country"
                style={{marginTop: "1em"}}
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
                style={{marginTop: "1em"}}
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
        </div>
    )
}

