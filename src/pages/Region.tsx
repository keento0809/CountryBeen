import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj, PropsRegion } from "../models/model";
import Wrapper from "../components/UI/Wrapper/Wrapper";
import RegionWrapper from "../components/UI/Wrapper/RegionWrapper";
import Header from "../layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";
import { regionImageArr, regionArr } from "../data/data";
import CountryCard from "../components/UI/Card/CountryCard";
import { RootState } from "../store";

const Region = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(defaultData.length);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSet, setIsSet] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [currRegion, setCurrRegion] = useState("");

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // declare useSelector
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );

  // declare dispatch
  const dispatch = useDispatch();

  // declare navigate
  const navigate = useNavigate();

  let selectedRegion: string;
  let selectedImage: string;

  function checkRegion() {
    let boolRegion = false;

    const pathArr = window.location.pathname.split("/");

    pathArr.forEach((text) => {
      for (let i = 0; i < regionArr.length; i++) {
        if (text === regionArr[i]) {
          boolRegion = true;
          if (regionArr[i] === "North%20America") {
            selectedRegion = "North America";
          } else if (regionArr[i] === "South%20America") {
            selectedRegion = "South America";
          } else selectedRegion = regionArr[i];
          setBgImage(regionImageArr[selectedRegion]);
          setCurrRegion(selectedRegion);
        }
      }
    });
    if (!boolRegion) {
      navigate("/home");
    }
  }

  function fetchCountryData() {
    setIsLoading(true);

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;

        const loadedData = [];
        for (const key in resData) {
          // I need to change here.
          if (resData[key].continents[0] === selectedRegion) {
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
        }
        setDefaultData(loadedData);
        setCountryData(loadedData);
        setDataLength(loadedData.length);
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
  }

  function utilizeCountriesData() {
    const resData: any = countriesData;
    const loadedData = [];

    for (const key in resData) {
      // I need to change here.
      if (resData[key].continents[0] === selectedRegion) {
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
    }
    setDefaultData(loadedData);
    setCountryData(loadedData);
    setDataLength(loadedData.length);
  }

  useEffect(() => {
    checkRegion();
    if (countriesData.length === 0) {
      fetchCountryData();
    } else {
      utilizeCountriesData();
    }
  }, []);

  function handleCheckValue() {
    const filteredData = defaultData.filter((country) =>
      country.name
        .toLowerCase()
        .includes(searchInputRef.current!.value.toLowerCase())
    );
    setCountryData(filteredData);
    setDataLength(filteredData.length);
  }

  return (
    <RegionWrapper imageUrl={bgImage}>
      <div className="">
        <section className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onKeyUp={handleCheckValue}
          />
        </section>
        <section className="countries py-4 md:pb-0">
          <div className="regionCountries">
            <div className="min-h-40">
              {isLoading && (
                <h2 className="text-slate-200 font-bold text-xl block">
                  Loading...
                </h2>
              )}
              {!isLoading && (
                <p className="font-bold text-xl text-slate-100 pb-3">
                  {currRegion}: {dataLength} countries matched
                </p>
              )}
            </div>
            {!isLoading && (
              <div className="region-container max-h-640 overflow-scroll md:flex md:flex-wrap md:justify-between">
                {countryData.map((country, index) => {
                  return (
                    <CountryCard
                      key={index}
                      flagImg={`${country.flagImg}`}
                      countryName={country.name}
                      cca3={country.cca3}
                      isBeenTo={false}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </RegionWrapper>
  );
};

export default Region;
