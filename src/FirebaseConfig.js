import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'



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

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebaseApp.firestore();

export { auth, db };











