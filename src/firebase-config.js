import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore" 

const firebaseConfig = {
    apiKey: "AIzaSyA0oWBXXG0Va6hsOvyqVt2LYHqa_QNyIAc",
    authDomain: "mine2mint.firebaseapp.com",
    projectId: "mine2mint",
    storageBucket: "mine2mint.appspot.com",
    messagingSenderId: "17494011931",
    appId: "1:17494011931:web:82b59f019003d91687c8be",
    measurementId: "G-P48PMPT7TR"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);