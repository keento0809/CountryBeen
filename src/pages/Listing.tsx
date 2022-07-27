import DisplayWrapper from "../components/Wrapper/DisplayWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { CountryViewObj } from "../models/model";
import CountryCard from "../components/UI/Card/CountryCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { favoriteActions } from "../store/favorite-slice";

interface ListingName {
  name: string;
}

const Listing = ({ name }: ListingName) => {
  // declare dispatch
  const dispatch = useDispatch();
  // declare selector
  const favoriteList = useSelector(
    (state: RootState) => state.favoriteReducer.favoriteList
  );
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );

  async function getCountryData() {
    const querySnapshot = await getDocs(collection(db, "bucketlist"));
    const bucketListDb: any = [];
    querySnapshot.forEach((doc) => {
      const resData = doc.data();
      bucketListDb.push({
        name: resData.name,
        capital: resData.capital ? resData.capital : "",
        population: resData.population,
        continents: resData.continents,
        currencies: resData.currencies ? resData.currencies : "",
        languages: resData.languages,
        coatOfArms: resData.coatOfArms.png,
        flagImg: resData.flagImg,
        flagIcon: resData.flag,
        cca3: resData.cca3,
        borders: resData.borders,
      });
    });
    dispatch(favoriteActions.fetchFavorite(bucketListDb));
  }

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <DisplayWrapper>
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">{name}</h2>
        </div>
        {((name === "Record" && beenToList.length === 0) ||
          (name !== "Record" && favoriteList.length === 0)) && (
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
