// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "tools-hub-express",
  "appId": "1:246835418676:web:820921ef126c58b6521c61",
  "storageBucket": "tools-hub-express.firebasestorage.app",
  "apiKey": "AIzaSyAGufbdqOWesJy44mJml8jpLwgYrRUvCuk",
  "authDomain": "tools-hub-express.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "246835418676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
