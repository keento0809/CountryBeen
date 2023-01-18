import DisplayWrapper from "../components/Wrapper/DisplayWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import CountryCard from "../components/Card/CountryCard";
import { useEffect, useState } from "react";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";
import { fetchCurrentUserDataFromDB } from "../helpers/Listing";
import { useLocation } from "react-router-dom";

interface ListingName {
  name: string;
}

const Listing = ({ name }: ListingName) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { favoriteList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);

  const getCurrentUserCountryData = async (name: string) => {
    setIsLoading(true);
    await fetchCurrentUserDataFromDB()
      .then((res) => {
        dispatch(
          name === "record"
            ? beenActions.fetchBeenTo(res.beenListDataFromDb)
            : favoriteActions.fetchFavorite(res.favoriteListDataFromDb)
        );
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };
  useEffect(() => {
    name === "Record" &&
      beenToList.length === 0 &&
      getCurrentUserCountryData("record");
    name === "Bucket List" &&
      favoriteList.length === 0 &&
      getCurrentUserCountryData("bucketList");
  }, [location.pathname]);
  return (
    <DisplayWrapper>
      <div className="">
        <div className="title text-center text-white">
          <h2 className="py-6 font-bold text-2xl">{name}</h2>
        </div>
        <div className="text-center">
          {((!isLoading && name === "Record" && beenToList.length === 0) ||
            (!isLoading && name !== "Record" && favoriteList.length === 0)) && (
            <p className="text-white dark:text-slate-100">
              No countries added.
            </p>
          )}
          {isLoading && (
            <p className="text-white dark:text-slate-100">Loading...</p>
          )}
        </div>
        <div className="overflow-scroll rounded-2xl max-h-680 md:grid md:grid-cols-2 md:mx-auto md:max-w-704 lg:grid-cols-3 lg:max-w-960 xl:grid-cols-4 xl:max-w-none xl:gap-2">
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
