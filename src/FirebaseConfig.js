import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC6XRXwV2y41V2fdgxjA_ek-zQ6pT8klww",
  authDomain: "typing-speed-test-websit-8187e.firebaseapp.com",
  projectId: "typing-speed-test-websit-8187e",
  storageBucket: "typing-speed-test-websit-8187e.appspot.com",
  messagingSenderId: "327615661271",
  appId: "1:327615661271:web:66a57cc2f7b56a6504dc92",
  measurementId: "G-D4M81M28G4"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebaseApp.firestore();

export { auth, db };











/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6XRXwV2y41V2fdgxjA_ek-zQ6pT8klww",
  authDomain: "typing-speed-test-websit-8187e.firebaseapp.com",
  projectId: "typing-speed-test-websit-8187e",
  storageBucket: "typing-speed-test-websit-8187e.appspot.com",
  messagingSenderId: "327615661271",
  appId: "1:327615661271:web:66a57cc2f7b56a6504dc92",
  measurementId: "G-D4M81M28G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/