import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/UI/Wrapper/Wrapper";
import RegionWrapper from "../components/UI/Wrapper/RegionWrapper";
import Header from "../layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions, beenReducer } from "../store/been-slice";
import { AlertActions } from "../store/alert-slice";
import { regionImageArr } from "../data/data";
import { RootState } from "../store";

const initialState = {
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

const CountryDetail: React.FC = () => {
  // declare useState
  const [countryData, setCountryData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [bgImage, setBgImage] = useState("");

  // declare selector
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );
  const isSuccessToAdd = useSelector(
    (state: RootState) => state.beenReducer.isSuccessToAdd
  );
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );

  // declare dispatch
  const dispatch = useDispatch();

  // declare navigate
  const navigate = useNavigate();

  function requestCountryData() {
    setIsLoading(true);

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;

        const pathName = window.location.pathname.toString();
        const currentCCA3 = pathName.substring(
          pathName.length - 3,
          pathName.length
        );

        for (const key in resData) {
          if (resData[key].cca3 === currentCCA3) {
            setCountryData({
              name: resData[key].name.common,
              capital: resData[key].capital ? resData[key].capital : "",
              population: resData[key].population,
              continents: resData[key].continents,
              currencies: resData[key].currencies
                ? resData[key].currencies
                : "",
              languages: resData[key].languages,
              coatOfArms: resData[key].coatOfArms.png,
              flagImg: resData[key].flags.png,
              flagIcon: resData[key].flag,
              cca3: resData[key].cca3,
              borders: resData[key].borders,
            });
            setBgImage(regionImageArr[resData[key].continents]);
            break;
          }
        }
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
  }

  function utilizeCountriesData() {
    const resData: any = countriesData;

    const pathName = window.location.pathname.toString();
    const currentCCA3 = pathName.substring(
      pathName.length - 3,
      pathName.length
    );

    for (const key in resData) {
      if (resData[key].cca3 === currentCCA3) {
        setCountryData({
          name: resData[key].name.common,
          capital: resData[key].capital ? resData[key].capital : "",
          population: resData[key].population,
          continents: resData[key].continents,
          currencies: resData[key].currencies ? resData[key].currencies : "",
          languages: resData[key].languages,
          coatOfArms: resData[key].coatOfArms.png,
          flagImg: resData[key].flags.png,
          flagIcon: resData[key].flag,
          cca3: resData[key].cca3,
          borders: resData[key].borders,
        });
        setBgImage(regionImageArr[resData[key].continents]);
        break;
      }
    }
  }

  function handleToggleFavorite() {
    dispatch(favoriteActions.addFavorite(countryData));
    dispatch(AlertActions.turnOnAlert("Country Added to BucketList!"));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  }

  function handleToggleBeenTo() {
    dispatch(beenActions.addBeenTo(countryData));
    dispatch(AlertActions.turnOnAlert("Country Added to Record!"));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  }

  useEffect(() => {
    if (countriesData.length === 0) {
      requestCountryData();
    } else utilizeCountriesData();
    // test dependencies
  }, [window.location.pathname]);

  return (
    <RegionWrapper imageUrl={bgImage}>
      <div className="flex justify-center items-center z-10 pt-4 lg:pt-16">
        <div className="card w-full glass mx-auto max-w-374 md:max-h-680 lg:max-w-960 lg:flex lg:flex-row lg:items-start max-h-780 overflow-scroll bg-transparent rounded-3xl">
          <figure className="pb-3 lg:min-w-374 lg:mr-2">
            <img
              src={`${countryData.flagImg}`}
              alt=""
              className="w-full h-248 rounded-3xl"
            />
          </figure>
          <div className="card-body bg-white dark:bg-slate-700 opacity-80 rounded-3xl">
            {/* original */}
            {/* <div className="flex flex-wrap items-start flex-col overflow-x-scroll"> */}
            <div className="">
              <h2 className="stat-value overflow-x-auto">{`${countryData.name}`}</h2>
              <div className="icons max-h-32 my-2">
                <div className="tooltip tooltip-left" data-tip="Add BucketList">
                  <svg
                    onClick={handleToggleFavorite}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-4 inline-block cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#f92fca"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div className="tooltip tooltip-right" data-tip="Add Record">
                  <svg
                    onClick={handleToggleBeenTo}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 inline-block cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#f92fca"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {/* temporary */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 inline-block cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="#f92fca"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg> */}
              </div>
            </div>
            <div className="flex flex-wrap flex-row justify-start items-start pb-3">
              <div className="country-data basis-1/2 min-h-56 pr-2 ">
                <div className="stat-title">Capital City</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.capital}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">Population</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.population.toLocaleString()}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">Region</div>
                <div className="font-bold text-2xl tracking-tight">
                  {countryData.continents}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">Language</div>
                <div className="font-bold text-2xl tracking-tight break-words">
                  {/* original */}
                  {Object.values(countryData.languages)[0]}{" "}
                  {Object.values(countryData.languages)[1] &&
                    " , " + Object.values(countryData.languages)[1]}
                  {Object.values(countryData.languages)[2] &&
                    " , " + Object.values(countryData.languages)[2]}
                  {Object.values(countryData.languages)[3] &&
                    " , " + Object.values(countryData.languages)[3]}
                  {Object.values(countryData.languages)[4] &&
                    " , " + Object.values(countryData.languages)[4]}
                  {/* {languageArr} */}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">Currency</div>
                <div className="font-bold text-2xl tracking-tight">
                  {/* original */}
                  {Object.keys(countryData.currencies)[0]}{" "}
                  {Object.keys(countryData.currencies)[1] &&
                    " , " + Object.keys(countryData.currencies)[1]}
                  {/* {currencyArray} */}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">More Info</div>
                <div className="font-normal text-2xl tracking-tight">
                  <a
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
              <button className="btn btn-secondary btn-outline">
                <Link to={`/countries/region/${countryData.continents}`}>
                  BACK
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </RegionWrapper>
  );
};

export default CountryDetail;
