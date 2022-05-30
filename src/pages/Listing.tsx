import DisplayWrapper from "../components/UI/Wrapper/DisplayWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CountryViewObj } from "../models/model";
import CountryCard from "../components/UI/Card/CountryCard";
import { useEffect, useState } from "react";

interface ListingName {
  name: string;
}

const Listing = ({ name }: ListingName) => {
  // declare selector
  const favoriteList = useSelector(
    (state: RootState) => state.favoriteReducer.favoriteList
  );
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );

  function handleToggleBeenTo() {
    console.log("I need to change something.");
  }

  return (
    <DisplayWrapper>
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">{name}</h2>
        </div>
        <div className="overflow-scroll max-h-680 md:max-h-640 md:flex flex-wrap">
          {(name === "Record" ? beenToList : favoriteList).map(
            (country, index) => {
              return (
                <CountryCard
                  key={index}
                  flagImg={`${country.flagImg}`}
                  countryName={country.name}
                  cca3={country.cca3}
                  isBeenTo={name === "Record" ? true : false}
                />
              );
            }
          )}
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default Listing;