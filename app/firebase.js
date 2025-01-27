// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfITU5w9-PoxD9bDdW42NDgiY8hRPSJXQ",
  authDomain: "allchat-3ed04.firebaseapp.com",
  projectId: "allchat-3ed04",
  storageBucket: "allchat-3ed04.appspot.com",
  messagingSenderId: "243359002250",
  appId: "1:243359002250:web:23b79f7f830f29cceac773",
  measurementId: "G-FN1SHZ60SJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };