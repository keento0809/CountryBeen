import { useEffect, useState } from "react";
import axios from "axios";
import { CountryViewObj } from "../models/model";

const Search = () => {
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);

  function fetchCountryData() {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;
        console.log(resData);

        const loadedData = [];
        for (const key in resData) {
          loadedData.push({
            name: resData[key].name.common,
            population: resData[key].population,
            continents: resData[key].continents,
            capital: resData[key].capital,
            currencies: resData[key].currencies,
            languages: resData[key].languages,
            coatOfArms: resData[key].coatOfArms.png,
            flagImg: resData[key].flags.png,
            flagIcon: resData[key].flag,
            cca3: resData[key].cca3,
            borders: resData[key].borders,
          });
        }
        // console.log(loadedData[0]);
        setCountryData(loadedData);
      })
      .catch((error) => console.log(error.message));
  }
  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <div>
      <p>Search</p>
    </div>
  );
};

export default Search;
