import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../../store/favorite-slice";
import { beenActions } from "../../store/been-slice";
import { AlertActions } from "../../store/alert-slice";
import { AppDispatch, RootState } from "../../store";
import { CountryViewObj, ResCountryData } from "../../types/country";
import {
  updateDataInFirebase,
  deleteDataInFirebase,
  checkListIfFavoriteOrBeenTo,
  createCountryDataObj,
} from "../../helpers/CountryDetail";
import CountryDataSection from "./CountryDataSection";
import IconsSection from "./IconsSection";
import FlagImgSection from "./FlagImgSection";

const countryDataInitialState: CountryViewObj = {
  name: "",
  capital: "",
  population: "",
  continents: "",
  currencies: "",
  languages: "",
  coatOfArms: "",
  flagImg: "",
  flagIcon: "",
  cca3: "",
  borders: "",
};

const CountryDetailContainer: React.FC = () => {
  // react state
  const [countryData, setCountryData] = useState<CountryViewObj>(
    countryDataInitialState
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBeenTo, setIsBeenTo] = useState(false);
  // local storage
  const currUserId = localStorage.getItem("currUser")
    ? localStorage.getItem("currUser")
    : "";
  // state from store (redux)
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );
  const { favoriteList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  // dispatch, router (navigate)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSetCountryData = (resData: ResCountryData[]) => {
    const pathName = window.location.pathname.toString();
    const currentCCA3 = pathName.substring(
      pathName.length - 3,
      pathName.length
    );
    for (const key in resData) {
      if (resData[key].cca3 === currentCCA3) {
        const countryDataObj = createCountryDataObj(key, resData);
        setCountryData(countryDataObj);
        checkListIfFavoriteOrBeenTo(
          favoriteList,
          resData[key].cca3,
          setIsFavorite
        );
        checkListIfFavoriteOrBeenTo(beenToList, resData[key].cca3, setIsBeenTo);
        break;
      }
    }
  };

  const requestCountryData = async () => {
    axios
      .get(`${process.env.REACT_APP_FETCH_COUNTRY_DATA_ENDPOINT}`)
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;
        handleSetCountryData(resData);
      })
      .catch((error) => console.log(error.message));
  };

  const utilizeCountriesData = () => {
    const resData = countriesData;
    handleSetCountryData(resData);
  };

  const handleNavigatePageWithAlert = (alertText: string) => {
    dispatch(AlertActions.turnOnAlert(alertText));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  };

  const handleAddFavorite = async () => {
    dispatch(favoriteActions.addFavorite(countryData));
    await updateDataInFirebase("bucketList", countryData, currUserId);
    handleNavigatePageWithAlert("Country Added to BucketList!");
  };

  const handleRemoveFavorite = async () => {
    dispatch(favoriteActions.removeFavorite(countryData));
    await deleteDataInFirebase("bucketList", countryData, currUserId);
    handleNavigatePageWithAlert("Country deleted from BucketList!");
  };

  const handleAddBeenTo = async () => {
    dispatch(beenActions.addBeenTo(countryData));
    await updateDataInFirebase("record", countryData, currUserId);
    handleNavigatePageWithAlert("Country Added to Record!");
  };

  const handleRemoveBeenTo = async () => {
    dispatch(beenActions.removeBeenTo(countryData));
    await deleteDataInFirebase("record", countryData, currUserId);
    handleNavigatePageWithAlert("Country deleted from Record!");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    countriesData.length === 0 ? requestCountryData() : utilizeCountriesData();
  }, [window.location.pathname]);

  return (
    <div className="flex justify-center items-center z-10 pt-4 pb-12 lg:pt-16">
      <div className="card w-full glass mx-auto max-w-374 md:max-h-680 lg:max-w-960 lg:flex lg:flex-row lg:items-start max-h-780 overflow-scroll bg-transparent rounded-3xl">
        <FlagImgSection flagImgUrl={countryData?.flagImg} />
        <div className="card-body bg-white dark:bg-slate-700 opacity-80 rounded-3xl">
          <div>
            <h2 className="stat-value overflow-x-auto overflow-y-hidden dark:text-slate-100">{`${countryData.name}`}</h2>
            <IconsSection
              isFavorite={isFavorite}
              isBeenTo={isBeenTo}
              handleAddBeenTo={handleAddBeenTo}
              handleRemoveBeenTo={handleRemoveBeenTo}
              handleAddFavorite={handleAddFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          </div>
          <CountryDataSection countryData={countryData} />
          <div className="card-actions justify-end">
            <span onClick={handleGoBack}>
              <button className="btn btn-secondary btn-outline">BACK</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailContainer;
