// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANbxEmxNLomd5GErX-NjMcSbY_xbYWl5k",
  authDomain: "countrybeen-e8cec.firebaseapp.com",
  projectId: "countrybeen-e8cec",
  storageBucket: "countrybeen-e8cec.appspot.com",
  messagingSenderId: "588078640115",
  appId: "1:588078640115:web:17a04472c26b6064c8c086",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
