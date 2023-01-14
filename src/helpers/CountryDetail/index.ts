import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebase";
import { CountryViewObj } from "../../types/country";

export async function updateDataInFirebase(
  type: string,
  data: any,
  currUserId: string | null
) {
  if (currUserId) {
    const currUserRef = doc(db, "users", `${currUserId}`);
    await updateDoc(currUserRef, {
      [type]: arrayUnion(data),
    });
  }
}

export async function deleteDataInFirebase(
  type: string,
  countryData: CountryViewObj,
  currUserId: string | null
) {
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
}
