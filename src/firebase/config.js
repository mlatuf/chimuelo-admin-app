// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR0L19OxLpoNInPub_lWguN0HsC5gBqmg",
  authDomain: "chimuelo-admin.firebaseapp.com",
  projectId: "chimuelo-admin",
  storageBucket: "chimuelo-admin.appspot.com",
  messagingSenderId: "745326864649",
  appId: "1:745326864649:web:871597c951f41d4f5a4bd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db}