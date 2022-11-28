import DisplayWrapper from "../components/Wrapper/DisplayWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import CountryCard from "../components/Card/CountryCard";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { favoriteActions } from "../store/favorite-slice";
import { beenActions } from "../store/been-slice";

interface ListingName {
  name: string;
}

const Listing = ({ name }: ListingName) => {
  const [currUserId, setCurrUserId] = useState(
    localStorage.getItem("currUser") ? localStorage.getItem("currUser") : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  // declare dispatch
  const dispatch = useDispatch();
  // declare selector
  const { favoriteList } = useSelector(
    (state: RootState) => state.favoriteReducer
  );
  const { beenToList } = useSelector((state: RootState) => state.beenReducer);

  async function getCountryData(name: string) {
    setIsLoading(true);
    const currUserRef = doc(db, "users", `${currUserId}`);
    const querySnapshot = await getDoc(currUserRef);
    const snapShotData = querySnapshot.data();

    const listDataFromDb: any = [];
    const dataArray =
      name === "record" ? snapShotData!.record : snapShotData!.bucketList;
    dataArray.forEach((resData: any) => {
      listDataFromDb.push({
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
      name === "record"
        ? beenActions.fetchBeenTo(listDataFromDb)
        : favoriteActions.fetchFavorite(listDataFromDb)
    );
    setIsLoading(false);
  }

  useEffect(() => {
    name === "Record" && beenToList.length === 0 && getCountryData("record");
    name !== "Record" &&
      favoriteList.length === 0 &&
      getCountryData("bucketList");
    // getCountryData();
  }, []);

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
        <div className="overflow-scroll rounded-2xl max-h-680 md:max-h-640 md:flex flex-wrap">
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
