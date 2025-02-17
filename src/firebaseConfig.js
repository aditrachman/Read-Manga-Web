// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvVLYWzPA5qQ_42SvDJ7XnJY85s2jCeT0",
  authDomain: "mocomanga12.firebaseapp.com",
  projectId: "mocomanga12",
  storageBucket: "mocomanga12.firebasestorage.app",
  messagingSenderId: "539519357271",
  appId: "1:539519357271:web:a49f1f2cfe3dcd6decee12",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
