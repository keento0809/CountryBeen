import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj, RegionObj } from "../models/model";
import Wrapper from "../components/UI/Wrapper";
import Header from "../layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";
import { regionImageArr } from "../data/data";

const Search = () => {
  // declare useState
  const [defaultData, setDefaultData] = useState<CountryViewObj[]>([]);
  const [countryData, setCountryData] = useState<CountryViewObj[]>([]);
  const [dataLength, setDataLength] = useState(250);
  const [regionData, setRegionData] = useState<string[]>([]);

  // declare useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // declare dispatch
  const dispatch = useDispatch();

  // declare navigate
  const navigate = useNavigate();

  function fetchCountryData() {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;
        console.log(resData);

        const loadedRegion = [];
        const hash: any = {};
        for (const key in resData) {
          if (hash[resData[key].continents] === undefined) {
            hash[resData[key].continents] = resData[key].continents[0];
            loadedRegion.push(resData[key].continents[0]);
          }
        }
        const keysArr = Object.keys(regionImageArr);
        setRegionData(loadedRegion);
      })
      .catch((error) => console.log(error.message));
  }
  useEffect(() => {
    fetchCountryData();
  }, []);

  function handleCheckValue() {
    // console.log("re-rendering??");
    // const filteredData = defaultData.filter((country) =>
    //   country.name.toLowerCase().includes(searchInputRef.current!.value)
    // );
    // setCountryData(filteredData);
    // setDataLength(filteredData.length);
  }

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

  return (
    <Wrapper>
      <div className="">
        {/* <section className="py-4">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className="input input-bordered input-primary w-full max-w-xs outline-none border-0"
            onKeyUp={handleCheckValue}
          />
        </section> */}
        <section className="countries py-4">
          <div className="countries-container max-h-780 overflow-scroll">
            {regionData.map((region, index) => {
              return (
                <Link to={`/countries/region/${region}`} key={index}>
                  <div
                    className="card mb-2 w-full h-248 bg-base-100 shadow-xl image-full cursor-pointer"
                    // key={index}
                  >
                    <figure>
                      <img
                        className="object-cover w-full"
                        // original
                        // src="https://api.lorem.space/image/shoes?w=400&h=225"
                        src={regionImageArr[region]}
                        alt="Shoes"
                      />
                    </figure>

                    <div className="card-body flex justify-center items-center">
                      <div className="card-body__container">
                        <h2 className="grow font-extrabold text-3xl text-white">
                          {region}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Search;
