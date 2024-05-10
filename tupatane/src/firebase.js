// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCjMlL-iVjCoUTOjE67fLnDcG9fw7xjaI",
  authDomain: "whatsapp-clone-b19a9.firebaseapp.com",
  projectId: "whatsapp-clone-b19a9",
  storageBucket: "whatsapp-clone-b19a9.appspot.com",
  messagingSenderId: "180471727497",
  appId: "1:180471727497:web:5f3620a34f18b94db84d58",
  measurementId: "G-F1JSLGPBS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);