import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { CountryViewObj, ResCountryData } from "../../types/country";

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

export const createCountryObj = (data: ResCountryData[]) => {
  const loadedData: CountryViewObj[] = [];

  for (const key in data) {
    loadedData.push({
      name: data[key].name.common,
      population: data[key].population.toString(),
      continents: data[key].continents,
      capital: data[key].capital,
      currencies: data[key].currencies,
      languages: data[key].languages,
      coatOfArms: data[key].coatOfArms.png,
      flagImg: data[key].flags.png,
      flagIcon: data[key].flag,
      cca3: data[key].cca3,
      borders: data[key].borders,
    });
  }
  return loadedData;
};
