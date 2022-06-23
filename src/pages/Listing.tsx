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

  return (
    <DisplayWrapper>
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">{name}</h2>
        </div>
        {(beenToList.length === 0 || favoriteList.length === 0) && (
          <div className="text-center">
            <p className="text-white dark:text-slate-100">
              No countries added.
            </p>
          </div>
        )}
        <div className="overflow-scroll rounded-2xl max-h-680 md:max-h-640 md:flex flex-wrap">
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
