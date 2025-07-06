// src/firebase.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_xDWrzsLMfannQqoNXVEPBg0S8u89Avw",
  authDomain: "projectn-daee6.firebaseapp.com",
  projectId: "projectn-daee6",
  storageBucket: "projectn-daee6.firebasestorage.app",
  messagingSenderId: "606662393376",
  appId: "1:606662393376:web:ea8fd0da382c63371e8645",
  measurementId: "G-WN7KDR7N0F",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
