// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQR0SPyJDJMagOyZi314iVkB2B5Y6cCLw",
  authDomain: "sentisense-fbb72.firebaseapp.com",
  projectId: "sentisense-fbb72",
  storageBucket: "sentisense-fbb72.appspot.com",
  messagingSenderId: "239992666864",
  appId: "1:239992666864:web:2bd8f2bef8bab88be1e035",
  measurementId: "G-L2X7CWGXD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth();
