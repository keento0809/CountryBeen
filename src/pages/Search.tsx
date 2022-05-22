import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj } from "../models/model";
import Wrapper from "../components/UI/Wrapper";
import imgUrl from "../assets/test-cardBg.jpg";

const Search = () => {
  // declare useState
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        setCountryData(loadedData);
      })
      .catch((error) => console.log(error.message));
  }
  useEffect(() => {
    fetchCountryData();
  }, []);

  function handleCheckValue() {
    const filteredData = countryData.filter((country) =>
      country.name.toLowerCase().includes(searchInputRef.current!.value)
    );
    console.log(filteredData);
  }

  return (
    <div
      className="opacity-90"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
      }}
    >
      <Wrapper>
        <div className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onChange={handleCheckValue}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default Search;