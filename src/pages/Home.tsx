import { useEffect } from "react";
import Header from "../layouts/Header";
import HomeWrapper from "../components/Wrapper/HomeWrapper";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countriesActions } from "../store/countries-slice";
import { favoriteActions } from "../store/favorite-slice";
import { RootState } from "../store";
import Alert from "../components/UI/Alert/Alert";
import WorldMap from "../components/WorldMap/WorldMap";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { beenActions } from "../store/been-slice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  // declare selector
  const totalNumber = useSelector(
    (state: RootState) => state.favoriteReducer.totalNumber
  );
  const totals = useSelector((state: RootState) => state.beenReducer.totals);
  const beenToList = useSelector(
    (state: RootState) => state.beenReducer.beenToList
  );
  const isAlerting = useSelector(
    (state: RootState) => state.AlertReducer.isAlerting
  );
  const alertText = useSelector(
    (state: RootState) => state.AlertReducer.alertText
  );
  const isSuccessToAdd = useSelector(
    (state: RootState) => state.beenReducer.isSuccessToAdd
  );
  const isSuccessToAddBucketList = useSelector(
    (state: RootState) => state.favoriteReducer.isSuccessToAddBucketList
  );

  // declare dispatch
  const dispatch = useDispatch();

  // declare auth
  const auth = getAuth();

  // declare navigate
  const navigate = useNavigate();

  const percentage = (totals / 250) * 100;

  function fetchCountryData() {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res) throw new Error("Request failed.");
        const resData = res.data;
        dispatch(countriesActions.fetchCountries(resData));
      })
      .catch((error) => console.log(error.message));
  }

  async function fetchDataFromDB(isRecords: boolean) {
    const querySnapshot = isRecords
      ? await getDocs(collection(db, "records"))
      : await getDocs(collection(db, "bucketlist"));
    const resultData: any = [];
    querySnapshot.forEach((doc) => {
      const resData = doc.data();
      resultData.push({
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
    dispatch(
      isRecords
        ? beenActions.fetchBeenTo(resultData)
        : favoriteActions.fetchFavorite(resultData)
    );
  }

  const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        navigate("/");
      }
    });
  };
  checkAuth();

  useEffect(() => {
    localStorage.setItem("beenTo", JSON.stringify(beenToList));
  }, [beenToList.length]);

  useEffect(() => {
    // checkAuth();
    fetchCountryData();
    fetchDataFromDB(true);
    fetchDataFromDB(false);
  }, []);

  return (
    <Fragment>
      <HomeWrapper>
        <div className="lg:mx-auto">
          <section className="title text-center text-white">
            <h2 className="py-6 font-bold text-2xl">Dashboard</h2>
          </section>
          <div className="max-h-640 md:max-h-620 overflow-scroll">
            <section className="mapping bg-slate-700 rounded-2xl lg:mx-0">
              <WorldMap />
            </section>
            <div className="md:flex flex-row items-start justify-center">
              <section className="statistic-data pt-2 pb-5 md:basis-3/5">
                <div className="stats shadow flex flex-col">
                  <div className="stat basis-4/12 pb-3">
                    <div className="stat-figure text-secondary">
                      <Link to="/record">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-8 h-8 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className="stat-title">You've been to</div>
                    <div className="stat-value dark:text-slate-50">
                      {totals}
                    </div>
                    <div className="stat-desc">Countries</div>
                  </div>

                  <div className="stat basis-4/12">
                    <div className="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          //   stroke-width="2"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Achievement rate</div>
                    <div className="stat-value dark:text-slate-50">
                      {percentage.toFixed(1)}%
                    </div>
                    <div className="stat-desc">{totals} / 245 Countries</div>
                  </div>
                  <div className="stat basis-4/12">
                    <div className="stat-figure text-secondary">
                      <Link to="/bucket-list">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-8 h-8 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className="stat-title">Number of Bucket-list</div>
                    <div className="stat-value dark:text-slate-50">
                      {totalNumber}
                    </div>
                    <div className="stat-desc">Countries</div>
                  </div>
                </div>
              </section>
              <section className="buttons text-center md:basis-2/5 md:pt-10">
                <button className="btn btn-outline btn-secondary gap-2">
                  <Link to="/countries" className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    Explore World
                  </Link>
                </button>
              </section>
            </div>
          </div>
          {isAlerting && isSuccessToAdd && <Alert text={alertText} />}
          {isAlerting && isSuccessToAddBucketList && <Alert text={alertText} />}
          {isAlerting && !isSuccessToAddBucketList && !isSuccessToAdd && (
            <Alert text={alertText} />
          )}
        </div>
      </HomeWrapper>
    </Fragment>
  );
};

export default Home;
