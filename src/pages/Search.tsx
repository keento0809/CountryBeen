import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CountryViewObj, RegionObj } from "../models/model";
import Wrapper from "../components/UI/Wrapper";
import Header from "../layouts/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";

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

  const regionArr: any = {
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
        const keysArr = Object.keys(regionArr);
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
                        src={regionArr[region]}
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
