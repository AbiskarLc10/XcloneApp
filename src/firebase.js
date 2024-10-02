// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "xcloneapp-aee41.firebaseapp.com",
  projectId: "xcloneapp-aee41",
  storageBucket: "xcloneapp-aee41.appspot.com",
  messagingSenderId: "258613757139",
  appId: "1:258613757139:web:9baebebb353f402e0dc026",
  measurementId: "G-EXKBHH50GV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
