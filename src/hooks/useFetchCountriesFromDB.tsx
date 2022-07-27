import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function useFetchCountriesFromDB(isRecords: boolean) {
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
  return resultData;
}
