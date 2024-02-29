// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI-OozfajdwSO9EkLf9yjNeP2T8ojmI4g",
  authDomain: "odp-react.firebaseapp.com",
  projectId: "odp-react",
  storageBucket: "odp-react.appspot.com",
  messagingSenderId: "111498171022",
  appId: "1:111498171022:web:d35d7f15d353a09f1cefdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP); 