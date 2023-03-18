import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../../store/favorite-slice";
import { beenActions } from "../../store/been-slice";
import { AlertActions } from "../../store/alert-slice";
import { AppDispatch, RootState } from "../../store";
import { CountryViewObj } from "../../types/country";
import {
  updateDataInFirebase,
  deleteDataInFirebase,
  checkListIfFavoriteOrBeenTo,
} from "../../helpers/CountryDetail";
import FavoriteIcon from "../../components/Icons/FavoriteIcon";
import CheckIcon from "../../components/Icons/CheckIcon";

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

  const handleSetCountryData = (resData: any) => {
    const pathName = window.location.pathname.toString();
    const currentCCA3 = pathName.substring(
      pathName.length - 3,
      pathName.length
    );
    for (const key in resData) {
      if (resData[key].cca3 === currentCCA3) {
        setCountryData({
          name: resData[key].name.common ? resData[key].name.common : "No data",
          capital: resData[key].capital ? resData[key].capital : "No data",
          population: resData[key].population
            ? resData[key].population
            : "No data",
          continents: resData[key].continents
            ? resData[key].continents
            : "No data",
          currencies: resData[key].currencies
            ? resData[key].currencies
            : "No data",
          languages: resData[key].languages
            ? resData[key].languages
            : "No data",
          coatOfArms: resData[key].coatOfArms.png
            ? resData[key].coatOfArms.png
            : "No data",
          flagImg: resData[key].flags.png ? resData[key].flags.png : "No data",
          flagIcon: resData[key].flag ? resData[key].flag : "No data",
          cca3: resData[key].cca3 ? resData[key].cca3 : "No data",
          borders: resData[key].borders ? resData[key].borders : "No data",
        });
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
    const resData: any = countriesData;
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

  console.log(Object.values(countryData?.languages));

  return (
    <div className="flex justify-center items-center z-10 pt-4 pb-12 lg:pt-16">
      <div className="card w-full glass mx-auto max-w-374 md:max-h-680 lg:max-w-960 lg:flex lg:flex-row lg:items-start max-h-780 overflow-scroll bg-transparent rounded-3xl">
        <figure className="pb-3 lg:min-w-374 lg:mr-2">
          <img
            src={`${countryData.flagImg}`}
            alt=""
            className="w-full max-w-374 h-248 rounded-3xl"
          />
        </figure>
        <div className="card-body bg-white dark:bg-slate-700 opacity-80 rounded-3xl">
          <div className="">
            <h2 className="stat-value overflow-x-auto overflow-y-hidden dark:text-slate-100">{`${countryData.name}`}</h2>
            <div className="icons max-h-32 my-2">
              <div
                className="tooltip tooltip-left"
                data-tip={
                  !isFavorite ? "Add BucketList" : "Remove from BucketList"
                }
              >
                {!isFavorite && (
                  <FavoriteIcon
                    onClick={handleAddFavorite}
                    stroke={"#f92fca"}
                    strokeWidth={2}
                    fill={"none"}
                  />
                )}
                {isFavorite && (
                  <FavoriteIcon
                    onClick={handleRemoveFavorite}
                    fill={"#f92fca"}
                  />
                )}
              </div>
              <div
                className="tooltip tooltip-right"
                data-tip={!isBeenTo ? "Add Record" : "Remove from Record"}
              >
                {!isBeenTo && (
                  <CheckIcon
                    onClick={handleAddBeenTo}
                    stroke={"#f92fca"}
                    strokeWidth={2}
                    fill={"none"}
                  />
                )}
                {isBeenTo && (
                  <CheckIcon onClick={handleRemoveBeenTo} fill={"#f92fca"} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-row justify-start items-start pb-3">
            <div className="country-data basis-1/2 min-h-56 pr-2 ">
              <div className="stat-title">Capital City</div>
              {Object.values(countryData?.capital).map((city) => {
                return (
                  <div
                    key={city}
                    className="font-bold text-2xl tracking-tight dark:text-slate-100"
                  >
                    {city}
                  </div>
                );
              })}
            </div>
            <div className="country-data basis-1/2 min-h-56 pr-2">
              <div className="stat-title dark:text-slate-100">Population</div>
              <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
                {countryData.population.toLocaleString()}
              </div>
            </div>
            <div className="country-data basis-1/2 min-h-56 pr-2">
              <div className="stat-title">Region</div>
              <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
                {countryData.continents}
              </div>
            </div>
            <div className="country-data basis-1/2 min-h-56 pr-2">
              <div className="stat-title">Language</div>
              {Object.values(countryData?.languages).map((lang) => {
                return (
                  <div
                    key={lang}
                    className="font-bold text-2xl tracking-tight break-words dark:text-slate-100"
                  >
                    {lang}
                  </div>
                );
              })}
            </div>
            <div className="country-data basis-1/2 min-h-56 pr-2">
              <div className="stat-title">Currency</div>
              {Object.keys(countryData?.currencies).map((curr) => {
                return (
                  <div
                    key={curr}
                    className="font-bold text-2xl tracking-tight dark:text-slate-100"
                  >
                    {curr}
                  </div>
                );
              })}
            </div>
            <div className="country-data basis-1/2 min-h-56 pr-2">
              <div className="stat-title">More Info</div>
              <div className="font-normal text-2xl tracking-tight dark:text-slate-100">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://en.wikipedia.org/wiki/${
                    countryData.name[0]
                  }${countryData.name.slice(1)}`}
                  className="flex flex-row items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-1 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="cursor-pointer">Wikipedia</span>
                </a>
              </div>
            </div>
          </div>
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
