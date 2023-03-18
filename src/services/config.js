import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAR0L19OxLpoNInPub_lWguN0HsC5gBqmg',
  authDomain: 'chimuelo-admin.firebaseapp.com',
  projectId: 'chimuelo-admin',
  storageBucket: 'chimuelo-admin.appspot.com',
  messagingSenderId: '745326864649',
  appId: '1:745326864649:web:871597c951f41d4f5a4bd8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth, onAuthStateChanged };
