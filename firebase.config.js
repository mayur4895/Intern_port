// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpTlbYD-aaS66UI3q6vjVIxvgx2QI91U0",
  authDomain: "internportal-422916.firebaseapp.com",
  projectId: "internportal-422916",
  storageBucket: "internportal-422916.appspot.com",
  messagingSenderId: "904709231616",
  appId: "1:904709231616:web:7c99cf31a53aa5837d34e5",
  measurementId: "G-RZBKVLQ8KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 