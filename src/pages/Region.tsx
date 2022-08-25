import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj } from "../models/model";
import RegionWrapper from "../components/Wrapper/RegionWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { regionImageArr, regionArr } from "../data/data";
import CountryCard from "../components/UI/Card/CountryCard";
import { AppDispatch, RootState } from "../store";
import { fetchCountries } from "../store/countries-slice";

const Region = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(defaultData.length);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImage, setBgImage] = useState("");
  const [currRegion, setCurrRegion] = useState("");

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // declare useSelector
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );

  // declare dispatch
  const dispatch = useDispatch<AppDispatch>();

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

  function utilizeCountriesData() {
    const resData: any = countriesData;
    const loadedData = [];

    for (const key in resData) {
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
    setIsLoading(false);
  }

  useEffect(() => {
    checkRegion();
    if (countriesData.length === 0) {
      dispatch(fetchCountries());
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
              {!isLoading && countriesData && (
                <p className="font-bold text-xl text-slate-100 pb-3">
                  {currRegion}: {dataLength} countries matched
                </p>
              )}
            </div>
            {!isLoading && countryData && (
              <div className="region-container max-h-640 overflow-scroll md:flex md:flex-wrap">
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
