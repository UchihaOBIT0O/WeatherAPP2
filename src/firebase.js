// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjjSuwJh6bU64soeeHVBGdrmC6wpIDC6Q",
  authDomain: "newweatherapp-a8068.firebaseapp.com",
  projectId: "newweatherapp-a8068",
  storageBucket: "newweatherapp-a8068.appspot.com",
  messagingSenderId: "789797676955",
  appId: "1:789797676955:web:f1686f036ee429f625a33e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);

export default app;
