import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj } from "../models/model";
import Wrapper from "../components/UI/Wrapper";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";

const Search = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // declare dispatch
  const dispatch = useDispatch();

  function fetchCountryData() {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;

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
        setDefaultData(loadedData);
        setCountryData(loadedData);
      })
      .catch((error) => console.log(error.message));
  }
  useEffect(() => {
    fetchCountryData();
  }, []);

  let listing: any;

  function handleCheckValue() {
    // console.log("re-rendering??");
    const filteredData = defaultData.filter((country) =>
      country.name.toLowerCase().includes(searchInputRef.current!.value)
    );
    setCountryData(filteredData);
  }

  useEffect(() => {}, [countryData]);

  function handleToggleFavorite(e: any) {
    const addingCountryCCA3 = e.target.parentNode.id;
    const addingCountry = defaultData.find(
      (country) => country.cca3 === addingCountryCCA3
    );
    // I gutta add dispatch
    dispatch(favoriteActions.addFavorite(addingCountry!));
  }

  function handleToggleBeenTo(e: any) {
    const addingCountryCCA3 = e.target.parentNode.id;
    const addingCountry = defaultData.find(
      (country) => country.cca3 === addingCountryCCA3
    );
    // I gutta add dispatch
    dispatch(beenActions.addBeenTo(addingCountry!));
  }

  return (
    <Wrapper>
      <Header />
      <div className="pt-16">
        <section className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onKeyUp={handleCheckValue}
          />
        </section>
        <section className="countries py-4">
          <div className="">
            {countryData.map((country, index) => {
              return (
                <div
                  className="card w-full bg-base-100 shadow-xl image-full"
                  key={index}
                >
                  <figure>
                    <img
                      src="https://api.lorem.space/image/shoes?w=400&h=225"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <Link to={`/countries/${country.cca3}`} key={index}>
                      <h2 className="font-extrabold text-3xl">
                        {country.name}
                      </h2>
                    </Link>
                    <p>{country.population.toLocaleString()}</p>
                    <div className="icons flex flex-row" id={country.cca3}>
                      <svg
                        onClick={handleToggleFavorite}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <svg
                        onClick={handleToggleBeenTo}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Search;
