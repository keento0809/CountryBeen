import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj, PropsRegion } from "../models/model";
import Wrapper from "../components/UI/Wrapper";
import RegionWrapper from "../components/UI/RegionWrapper";
import Header from "../layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";
import { regionImageArr, regionArr } from "../data/data";

const Region = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(defaultData.length);
  const [isLoading, setIsLoading] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [currRegion, setCurrRegion] = useState("");

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        console.log(selectedRegion);
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
  useEffect(() => {
    checkRegion();
    fetchCountryData();
  }, []);

  let listing: any;

  function handleCheckValue() {
    const filteredData = defaultData.filter((country) =>
      country.name.toLowerCase().includes(searchInputRef.current!.value)
    );
    setCountryData(filteredData);
    setDataLength(filteredData.length);
  }

  useEffect(() => {}, [countryData]);

  function handleToggleFavorite(e: any) {
    const addingCountryCCA3 = e.target.parentNode.id;
    const addingCountry = defaultData.find(
      (country) => country.cca3 === addingCountryCCA3
    );
    // I gutta add dispatch
    dispatch(favoriteActions.addFavorite(addingCountry!));
    navigate("/home");
  }

  function handleToggleBeenTo(e: any) {
    const a = e.target.parentNode.id.toString();
    console.log(a);
    // const addingCountryCCA3 = e.target.parentNode.id;
    // console.log(e.target.parentNode.id);
    // if (addingCountryCCA3 === undefined) {
    //   alert("Request failed.");
    //   return;
    // }
    // const addingCountry = defaultData.find(
    //   (country) => country.cca3 === addingCountryCCA3
    // );
    // dispatch(beenActions.addBeenTo(addingCountry!));
    // navigate("/home");
  }

  useEffect(() => {
    setTimeout(() => {
      setIsSet(true);
    }, 800);
  }, []);

  return (
    <RegionWrapper imageUrl={bgImage}>
      {/* <Header /> */}
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
        <section className="countries py-4">
          <div className="">
            {isLoading && <p className="text-white font-bold">Loading...</p>}
            <div className="min-h-40">
              {!isLoading && isSet && (
                <p className="font-bold text-xl text-white pb-3">
                  {currRegion}: {dataLength} countries matched
                </p>
              )}
            </div>
            {!isLoading && (
              <div className="region-container max-h-640 overflow-scroll">
                {countryData.map((country, index) => {
                  return (
                    <div
                      className="card mb-4 w-full h-248 bg-base-100 shadow-xl image-full"
                      key={index}
                    >
                      <figure>
                        <img
                          className="object-cover w-full"
                          src={`${country.flagImg}`}
                          alt="Shoes"
                        />
                      </figure>
                      <div className="card-body">
                        <Link to={`/countries/${country.cca3}`} key={index}>
                          <h2 className="font-extrabold text-3xl">
                            {country.name}
                          </h2>
                        </Link>
                        <p className="invisible">
                          Population: {country.population.toLocaleString()}
                        </p>
                        <div className="icons flex flex-row" id={country.cca3}>
                          <svg
                            // onClick={handleToggleFavorite}
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
            )}
          </div>
        </section>
      </div>
    </RegionWrapper>
  );
};

export default Region;
