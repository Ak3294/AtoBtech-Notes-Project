import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2meMlB6cSEynDc6ydxn0q9p2MJuNX0GQ",
  authDomain: "atobtech-27768.firebaseapp.com",
  projectId: "atobtech-27768",
  storageBucket: "atobtech-27768.firebasestorage.app",
  messagingSenderId: "138465407355",
  appId: "1:138465407355:web:ed009c5401604b1bc48dde",
  measurementId: "G-RZ222QZH3E"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);