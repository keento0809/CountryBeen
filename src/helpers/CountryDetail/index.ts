import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebase";
import { CountryViewObj } from "../../types/country";

export const updateDataInFirebase = async (
  type: string,
  data: any,
  currUserId: string | null
) => {
  if (currUserId) {
    const currUserRef = doc(db, "users", `${currUserId}`);
    await updateDoc(currUserRef, {
      [type]: arrayUnion(data),
    });
  }
};

export const deleteDataInFirebase = async (
  type: string,
  countryData: CountryViewObj,
  currUserId: string | null
) => {
  if (currUserId) {
    const currUserRef = doc(db, "users", `${currUserId}`);
    const currUserSnap = await getDoc(currUserRef);
    const currUserData = currUserSnap.data();
    const dataArray =
      type === "record" ? currUserData!.record : currUserData!.bucketList;
    const updatedDataArray = dataArray.filter(
      (data: CountryViewObj) => data.cca3 !== countryData.cca3
    );

    await updateDoc(currUserRef, {
      [type]: updatedDataArray,
    });
    await getDoc(currUserRef);
  }
};

export const checkListIfFavoriteOrBeenTo = (
  list: CountryViewObj[],
  cca3Val: string,
  dispatch: (value: React.SetStateAction<boolean>) => void
) => {
  list?.forEach((country) => {
    country.cca3 === cca3Val && dispatch(true);
  });
};

export const createCountryDataObj = (key: string, resData: any) => {
  return {
    name: resData[key].name.common ? resData[key].name.common : "No data",
    capital: resData[key].capital ? resData[key].capital : "No data",
    population: resData[key].population ? resData[key].population : "No data",
    continents: resData[key].continents ? resData[key].continents : "No data",
    currencies: resData[key].currencies ? resData[key].currencies : "No data",
    languages: resData[key].languages ? resData[key].languages : "No data",
    coatOfArms: resData[key].coatOfArms.png
      ? resData[key].coatOfArms.png
      : "No data",
    flagImg: resData[key].flags.png ? resData[key].flags.png : "No data",
    flagIcon: resData[key].flag ? resData[key].flag : "No data",
    cca3: resData[key].cca3 ? resData[key].cca3 : "No data",
    borders: resData[key].borders ? resData[key].borders : "No data",
  };
};
