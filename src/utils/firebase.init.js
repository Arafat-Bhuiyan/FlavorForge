// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrhgimosDZn2JfpzT-jTnXoaHWVN_9eFc",
  authDomain: "etariantv.firebaseapp.com",
  projectId: "etariantv",
  storageBucket: "etariantv.firebasestorage.app",
  messagingSenderId: "711868387910",
  appId: "1:711868387910:web:a8d9f63ffa6b47a3997047",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
