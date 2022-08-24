import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegionWrapper from "../components/Wrapper/RegionWrapper";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";
import { AlertActions } from "../store/alert-slice";
import { regionImageArr } from "../data/data";
import { RootState } from "../store";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../services/firebase";
import { CountryViewObj } from "../models/model";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBeenTo, setIsBeenTo] = useState(false);
  const [currUserId, setCurrUserId] = useState(
    localStorage.getItem("currUser") ? localStorage.getItem("currUser") : ""
  );

  // declare selector
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);
  const countriesData = useSelector(
    (state: RootState) => state.countriesReducer.countries
  );
  const { favoriteList } = useSelector(
    (state: RootState) => state.favoriteReducer
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
              name: resData[key].name.common
                ? resData[key].name.common
                : "No data",
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
              flagImg: resData[key].flags.png
                ? resData[key].flags.png
                : "No data",
              flagIcon: resData[key].flag ? resData[key].flag : "No data",
              cca3: resData[key].cca3 ? resData[key].cca3 : "No data",
              borders: resData[key].borders ? resData[key].borders : "No data",
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

    function checkInFavorite(cca3Val: string) {
      favoriteList.forEach((country) => {
        country.cca3 === cca3Val && setIsFavorite(true);
      });
    }

    function checkInBeenTo(cca3Val: string) {
      beenToList.forEach((country) => {
        country.cca3 === cca3Val && setIsBeenTo(true);
      });
    }

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
        setBgImage(regionImageArr[resData[key].continents]);
        checkInFavorite(resData[key].cca3);
        checkInBeenTo(resData[key].cca3);
        break;
      }
    }
  }

  async function postToFirebase(type: string, data: any) {
    const currUserRef = doc(db, "users", `${currUserId && currUserId}`);
    await updateDoc(currUserRef, {
      // original
      [type]: arrayUnion(data),
    });
  }

  async function deleteToFirebase(type: string, countryData: CountryViewObj) {
    const currUserRef = doc(db, "users", `${currUserId}`);
    const currUserSnap = await getDoc(currUserRef);
    const currUserData = currUserSnap.data();
    const dataArray =
      type === "record" ? currUserData!.record : currUserData!.bucketList;
    const updatedDataArray = dataArray.filter(
      (data: CountryViewObj) => data.cca3 !== countryData.cca3
    );
    console.log(updatedDataArray);

    await updateDoc(currUserRef, {
      [type]: updatedDataArray,
    });
    const getSnap = await getDoc(currUserRef);
    const gettingData = getSnap.data();
    console.log(gettingData!.record);
  }

  async function handleAddFavorite() {
    console.log(countryData);
    dispatch(favoriteActions.addFavorite(countryData));
    await postToFirebase("bucketList", countryData);
    dispatch(AlertActions.turnOnAlert("Country Added to BucketList!"));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  }

  async function handleRemoveFavorite() {
    dispatch(favoriteActions.removeFavorite(countryData));
    await deleteToFirebase("bucketList", countryData);
    dispatch(AlertActions.turnOnAlert("Country deleted from BucketList!"));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  }

  async function handleAddBeenTo() {
    dispatch(beenActions.addBeenTo(countryData));
    await postToFirebase("record", countryData);
    dispatch(AlertActions.turnOnAlert("Country Added to Record!"));
    navigate("/home");
    setTimeout(() => {
      dispatch(AlertActions.turnOffAlert());
    }, 1000);
  }

  async function handleRemoveBeenTo() {
    dispatch(beenActions.removeBeenTo(countryData));
    await deleteToFirebase("record", countryData);
    dispatch(AlertActions.turnOnAlert("Country deleted from Record!"));
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
                    <svg
                      onClick={handleAddFavorite}
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
                  )}
                  {isFavorite && (
                    <svg
                      onClick={handleRemoveFavorite}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mr-4 inline-block cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="#f92fca"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div
                  className="tooltip tooltip-right"
                  data-tip={!isBeenTo ? "Add Record" : "Remove from Record"}
                >
                  {!isBeenTo && (
                    <svg
                      onClick={handleAddBeenTo}
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
                  )}
                  {isBeenTo && (
                    <svg
                      onClick={handleRemoveBeenTo}
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
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap flex-row justify-start items-start pb-3">
              <div className="country-data basis-1/2 min-h-56 pr-2 ">
                <div className="stat-title">Capital City</div>
                <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
                  {/* original */}
                  {/* {countryData.capital} */}
                  {Object.values(countryData.capital)[0]}
                  {Object.values(countryData.capital)[1] &&
                    ", " + Object.values(countryData.capital)[1]}
                  {Object.values(countryData.capital)[2] &&
                    ", " + Object.values(countryData.capital)[2]}
                </div>
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
                <div className="font-bold text-2xl tracking-tight break-words dark:text-slate-100">
                  {Object.values(countryData.languages)[0]}
                  {Object.values(countryData.languages)[1] &&
                    ", " + Object.values(countryData.languages)[1]}
                  {Object.values(countryData.languages)[2] &&
                    ", " + Object.values(countryData.languages)[2]}
                  {Object.values(countryData.languages)[3] &&
                    ", " + Object.values(countryData.languages)[3]}
                  {Object.values(countryData.languages)[4] &&
                    ", " + Object.values(countryData.languages)[4]}
                  {Object.values(countryData.languages)[5] &&
                    ", " + Object.values(countryData.languages)[5]}
                  {Object.values(countryData.languages)[6] &&
                    ", " + Object.values(countryData.languages)[6]}
                  {Object.values(countryData.languages)[7] &&
                    ", " + Object.values(countryData.languages)[7]}
                  {Object.values(countryData.languages)[8] &&
                    ", " + Object.values(countryData.languages)[8]}
                  {Object.values(countryData.languages)[9] &&
                    ", " + Object.values(countryData.languages)[9]}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">Currency</div>
                <div className="font-bold text-2xl tracking-tight dark:text-slate-100">
                  {Object.keys(countryData.currencies)[0]}
                  {Object.keys(countryData.currencies)[1] &&
                    ", " + Object.keys(countryData.currencies)[1]}
                </div>
              </div>
              <div className="country-data basis-1/2 min-h-56 pr-2">
                <div className="stat-title">More Info</div>
                <div className="font-normal text-2xl tracking-tight dark:text-slate-100">
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
