import { useEffect, useState } from "react";
import HomeWrapper from "../components/Wrapper/HomeWrapper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { AppDispatch, RootState } from "../store";
import Alert from "../components/Alert/Alert";
import WorldMap from "../components/WorldMap/WorldMap";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../services/firebase";
import { beenActions } from "../store/been-slice";

const Home = () => {
  const { totalNumber, isSuccessToAddBucketList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const { totals, isSuccessToAdd } = useSelector(
    (state: RootState) => state.beenReducer
  );
  const { isAlerting, alertText } = useSelector(
    (state: RootState) => state.AlertReducer
  );
  const currUserId = localStorage.getItem("currUser");
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isBeenLoading, setIsBeenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const percentage = (totals / 250) * 100;

  const fetchFromDB = async () => {
    setLoading(true);
    const currUserRef = doc(db, "users", `${currUserId}`);
    const currUserSnap = await getDoc(currUserRef);
    const currUserData: DocumentData | undefined = currUserSnap.data();

    const resultRecordData: any = [];
    const resultBucketListData: any = [];

    currUserData!.record.forEach((resData: any) => {
      resultRecordData.push({
        name: resData.name ? resData.name : "",
        capital: resData.capital ? resData.capital : "",
        population: resData.population ? resData.population : "",
        continents: resData.continents ? resData.continents : "",
        currencies: resData.currencies ? resData.currencies : "",
        languages: resData.languages ? resData.languages : "",
        coatOfArms: resData.coatOfArms?.png ? resData.coatOfArms.png : "",
        flagImg: resData.flagImg ? resData.flagImg : "",
        flagIcon: resData.flag ? resData.flag : "",
        cca3: resData.cca3 ? resData.cca3 : "",
        borders: resData.borders ? resData.borders : "",
      });
    });
    currUserData!.bucketList.forEach((resData: any) => {
      resultBucketListData.push({
        name: resData.name ? resData.name : "",
        capital: resData.capital ? resData.capital : "",
        population: resData.population ? resData.population : "",
        continents: resData.continents ? resData.continents : "",
        currencies: resData.currencies ? resData.currencies : "",
        languages: resData.languages ? resData.languages : "",
        coatOfArms: resData.coatOfArms?.png ? resData.coatOfArms.png : "",
        flagImg: resData.flagImg ? resData.flagImg : "",
        flagIcon: resData.flag ? resData.flag : "",
        cca3: resData.cca3 ? resData.cca3 : "",
        borders: resData.borders ? resData.borders : "",
      });
    });
    dispatch(beenActions.fetchBeenTo(resultRecordData));
    dispatch(favoriteActions.fetchFavorite(resultBucketListData));
    setLoading(false);
  };
  useEffect(() => {
    fetchFromDB();
  }, []);

  return (
    <>
      <HomeWrapper>
        <div className="lg:mx-auto">
          <section className="title text-center text-white">
            <h2 className="py-6 font-bold text-2xl">Dashboard</h2>
          </section>
          <div className="max-h-640 md:max-h-620 xl:max-h-none xl:flex xl:space-x-8 xl:justify-evenly overflow-scroll xl:overflow-clip">
            <section className="mapping bg-slate-700 rounded-2xl lg:mx-0 xl:min-w-800 xl:basis-1">
              <WorldMap />
            </section>
            <div className="md:flex flex-row xl:flex-col items-start xl:items-center justify-center">
              <section className="statistic-data pt-2 xl:pt-0 xl:min-w-500 pb-5 md:basis-3/5">
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
                    <div className="stat-value">
                      <span
                        className={`${
                          (isFavoriteLoading || isBeenLoading) && "hidden"
                        } dark:text-slate-50`}
                      >
                        {totals}
                      </span>
                      <span
                        className={`${
                          (!isFavoriteLoading || !isBeenLoading) && "hidden"
                        } dark:text-slate-50 text-2xl`}
                      >
                        Loading...
                      </span>
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
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Achievement rate</div>
                    <div className="stat-value">
                      <span
                        className={`${
                          (isFavoriteLoading || isBeenLoading) && "hidden"
                        } dark:text-slate-50`}
                      >
                        {percentage.toFixed(1)}%
                      </span>
                      <span
                        className={`${
                          (!isFavoriteLoading || !isBeenLoading) && "hidden"
                        } dark:text-slate-50 text-2xl`}
                      >
                        Loading...
                      </span>
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
                    <div className="stat-value">
                      <span
                        className={`${
                          (isFavoriteLoading || isBeenLoading) && "hidden"
                        } dark:text-slate-50`}
                      >
                        {totalNumber}
                      </span>
                      <span
                        className={`${
                          (!isFavoriteLoading || !isBeenLoading) && "hidden"
                        } dark:text-slate-50 text-2xl`}
                      >
                        Loading...
                      </span>
                    </div>
                    <div className="stat-desc">Countries</div>
                  </div>
                </div>
              </section>
              <section className="buttons text-center md:basis-2/5 md:pt-10 xl:pt-0 xl:flex xl:justify-center xl:items-center">
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
    </>
  );
};

export default Home;
