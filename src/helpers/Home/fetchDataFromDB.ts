import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../../services/firebase";

export const fetchDataFromDB = async (currUserId: string) => {
  const currUserRef = doc(db, "users", `${currUserId}`);
  const currUserSnap = await getDoc(currUserRef);
  const currUserData: DocumentData | undefined = currUserSnap.data();

  const resultRecordData2 = currUserData?.record.map((resData: any) => {
    return {
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
    };
  });

  const resultBucketListData2 = currUserData?.bucketList.map((resData: any) => {
    return {
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
    };
  });

  return { resultRecordData2, resultBucketListData2 };
};
