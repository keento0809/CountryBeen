import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayWrapper from "../components/UI/Wrapper/DisplayWrapper";
import Header from "../layouts/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CountryViewObj } from "../models/model";
import CountryCard from "../components/UI/Card/CountryCard";

const BucketList = () => {
  const favoriteList = useSelector(
    (state: RootState) => state.favoriteReducer.favoriteList
  );

  function handleToggleBeenTo() {
    console.log("I need to change something.");
  }

  return (
    <DisplayWrapper>
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">Bucket List</h2>
        </div>
        <div className="overflow-scroll max-h-680 md:max-h-640">
          {favoriteList.map((country, index) => {
            return (
              <CountryCard
                key={index}
                flagImg={`${country.flagImg}`}
                countryName={country.name}
                cca3={country.cca3}
                handleToggleBeenTo={handleToggleBeenTo}
              />
            );
          })}
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default BucketList;
