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

const Region = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(defaultData.length);
  const [isLoading, setIsLoading] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [bgImage, setBgImage] = useState("");

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

    const regionImageArr: any = {
      Asia: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470",
      Antarctica:
        "https://images.unsplash.com/photo-1535752385016-16aa049b6a8d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2123",
      Africa:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471",
      Europe:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420",
      Oceania:
        "https://images.unsplash.com/photo-1589330273594-fade1ee91647?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470",
      "North America":
        "https://images.unsplash.com/photo-1625230793635-9b429b1ff90f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467",
      "South America":
        "https://images.unsplash.com/photo-1543385426-191664295b58?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1595",
    };

    const pathArr = window.location.pathname.split("/");
    console.log(pathArr);
    const regionArr = [
      "Asia",
      "Antarctica",
      "Africa",
      "Europe",
      "Oceania",
      "North%20America",
      "South%20America",
    ];

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
        }
      }
    });
    if (!boolRegion) {
      // alert("Invalid url.");
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
                  Region, {dataLength} countries matched
                </p>
              )}
            </div>
            {!isLoading &&
              countryData.map((country, index) => {
                return (
                  <div
                    className="card w-full h-248 bg-base-100 shadow-xl image-full"
                    key={index}
                  >
                    <figure>
                      <img
                        className="object-cover w-full"
                        // src="https://api.lorem.space/image/shoes?w=400&h=225"
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
                      <p>{country.population.toLocaleString()}</p>
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
        </section>
      </div>
    </RegionWrapper>
  );
};

export default Region;
