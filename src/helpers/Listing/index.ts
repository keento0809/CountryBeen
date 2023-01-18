import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { CountryViewObj } from "../../types/country";

const currUserId = localStorage.getItem("currUser")
  ? localStorage.getItem("currUser")
  : "";

const pushCountryData = (dataArray: any) => {
  const listArr: CountryViewObj[] = [];
  dataArray.forEach((resData: any) => {
    listArr.push({
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
  return listArr;
};

export const fetchCurrentUserDataFromDB = async () => {
  const currUserRef = doc(db, "users", `${currUserId}`);
  const querySnapshot = await getDoc(currUserRef);
  const snapShotData = querySnapshot.data();
  const favoriteListDataFromDb: CountryViewObj[] = pushCountryData(
    snapShotData!.bucketList
  );
  const beenListDataFromDb: CountryViewObj[] = pushCountryData(
    snapShotData!.record
  );
  return { favoriteListDataFromDb, beenListDataFromDb };
};
