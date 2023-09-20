// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: "typing-speed-test-websit-8187e.firebaseapp.com",
  projectId: "typing-speed-test-websit-8187e",
  storageBucket: "typing-speed-test-websit-8187e.appspot.com",
  messagingSenderId: "327615661271",
  appId: "1:327615661271:web:66a57cc2f7b56a6504dc92",
  measurementId: "G-D4M81M28G4"
};

// console.log(process.env.REACT_APP_APIKEY);


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);//auth is instanse of app
export const db = getFirestore(app)











