import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favorite-slice";
import { AppDispatch, RootState } from "../store";
import Alert from "../components/Alert/Alert";
import WorldMap from "../components/WorldMap/WorldMap";
import { beenActions } from "../store/been-slice";
import UserDashboard from "../features/Home/UserDashborad";
import BasicButton from "../components/Button/BasicButton";
import { fetchDataFromDB } from "../helpers/Home/fetchDataFromDB";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { totalNumber, isSuccessToAddBucketList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const { totals, isSuccessToAdd } = useSelector(
    (state: RootState) => state.beenReducer
  );
  const { isAlerting, alertText } = useSelector(
    (state: RootState) => state.AlertReducer
  );
  const percentage = (totals / 250) * 100;
  const currUserId = localStorage.getItem("currUser");
  const dispatch = useDispatch<AppDispatch>();
  const dataObj = {
    totalBeenToCountries: totals,
    percentage,
    totalFavoriteCountries: totalNumber,
  };

  useEffect(() => {
    if (currUserId) {
      setIsLoading(true);
      fetchDataFromDB(currUserId)
        .then((res) => {
          const { resultRecordData2, resultBucketListData2 } = res;
          dispatch(beenActions.fetchBeenTo(resultRecordData2));
          dispatch(favoriteActions.fetchFavorite(resultBucketListData2));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Wrapper customStyle={`max-w-374 md:max-w-600 xl:max-w-none`}>
        <div className="lg:mx-auto">
          <section className="title text-center text-white">
            <h2 className="py-6 font-bold text-2xl">Dashboard</h2>
          </section>
          <div className="xl:flex xl:space-x-8 xl:justify-evenly overflow-scroll xl:overflow-clip">
            <section className="mapping bg-slate-700 rounded-2xl lg:mx-0 xl:min-w-800 xl:basis-1">
              <WorldMap />
            </section>
            <div className="md:flex flex-row xl:flex-col items-start xl:items-center justify-center">
              <UserDashboard isLoading={isLoading} data={dataObj} />
              <section className="buttons text-center md:basis-2/5 md:pt-10 xl:pt-0 xl:flex xl:justify-center xl:items-center">
                <BasicButton link={"/countries"} />
              </section>
            </div>
          </div>
          {isAlerting && isSuccessToAdd && <Alert text={alertText} />}
          {isAlerting && isSuccessToAddBucketList && <Alert text={alertText} />}
          {isAlerting && !isSuccessToAddBucketList && !isSuccessToAdd && (
            <Alert text={alertText} />
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
