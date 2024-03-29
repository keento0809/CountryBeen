import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import CountryCard from "../../components/Cards/CountryCard";
import { useEffect, useState } from "react";
import { favoriteActions } from "../../store/favorite-slice";
import { beenActions } from "../../store/been-slice";
import { fetchCurrentUserDataFromDB } from "../../helpers/Listing";
import { useLocation } from "react-router-dom";
import Title from "../../components/Title/Title";

interface ListingName {
  name: string;
}

const CountriesList = ({ name }: ListingName) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { favoriteList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);

  useEffect(() => {
    switch (name) {
      case "Record": {
        beenToList.length === 0 && getCurrentUserCountryData("record");
        break;
      }
      case "Bucket List": {
        favoriteList.length === 0 && getCurrentUserCountryData("bucketList");
        break;
      }
      default: {
        break;
      }
    }
  }, [location.pathname]);

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

  return (
    <div>
      <Title title={`${name}`} />
      <div className="text-center">
        {((!isLoading && name === "Record" && beenToList.length === 0) ||
          (!isLoading && name !== "Record" && favoriteList.length === 0)) && (
          <p className="text-white dark:text-slate-100">No countries added.</p>
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
  );
};

export default CountriesList;
