// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ0YUt5qvpvgFU00Kq575EJk9ok3MigIE",
    authDomain: "chattie-ai-messenger.firebaseapp.com",
    projectId: "chattie-ai-messenger",
    storageBucket: "chattie-ai-messenger.appspot.com",
    messagingSenderId: "77874722551",
    appId: "1:77874722551:web:88b13480b455a165c785f2",
    measurementId: "G-Y3J5L8KQE3"
  };

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
