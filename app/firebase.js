// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfITU5w9-PoxD9bDdW42NDgiY8hRPSJXQ",
  authDomain: "allchat-3ed04.firebaseapp.com",
  projectId: "allchat-3ed04",
  storageBucket: "allchat-3ed04.firebasestorage.app",
  messagingSenderId: "243359002250",
  appId: "1:243359002250:web:23b79f7f830f29cceac773",
  measurementId: "G-FN1SHZ60SJ"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // if already initialized, use that one
}   

export default app;


