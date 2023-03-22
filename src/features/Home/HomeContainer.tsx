import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../../store/favorite-slice";
import { AppDispatch, RootState } from "../../store";
import Alert from "../../components/Alert/Alert";
import WorldMap from "../../components/WorldMap/WorldMap";
import { beenActions } from "../../store/been-slice";
import UserDashboard from "../../features/Home/UserDashborad";
import BasicButton from "../../components/Button/BasicButton";
import { fetchDataFromDB } from "../../helpers/Home";
import Title from "../../components/Title/Title";

const HomeContainer = () => {
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
      <div className="lg:mx-auto">
        <Title title={"Dashboard"} />
        <div className="pb-12 xl:flex xl:space-x-8 xl:justify-evenly overflow-scroll xl:overflow-clip">
          <section className="mapping bg-slate-700 rounded-2xl lg:mx-0 xl:min-w-800 xl:basis-1">
            <WorldMap />
          </section>
          <section className="md:flex flex-row xl:flex-col items-start xl:items-center justify-center">
            <UserDashboard isLoading={isLoading} data={dataObj} />
            <section className="buttons text-center md:basis-2/5 md:pt-10 xl:pt-0 xl:flex xl:justify-center xl:items-center">
              <BasicButton link={"/countries"} />
            </section>
          </section>
        </div>
        {isAlerting && isSuccessToAdd && <Alert text={alertText} />}
        {isAlerting && isSuccessToAddBucketList && <Alert text={alertText} />}
        {isAlerting && !isSuccessToAddBucketList && !isSuccessToAdd && (
          <Alert text={alertText} />
        )}
      </div>
    </>
  );
};

export default HomeContainer;
