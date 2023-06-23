import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyB1i1KcrVBmvNY1CxeKdjhM6_XIgSQ45FY",
    authDomain: "fifadraft-614b0.firebaseapp.com",
    projectId: "fifadraft-614b0",
    storageBucket: "fifadraft-614b0.appspot.com",
    messagingSenderId: "797524994217",
    appId: "1:797524994217:web:ea84780db1ca017ca261b8",
    measurementId: "G-FMGZ95DBN6"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Create Reference to Firebase Realtime DB
export const db = getDatabase(app);

// Create Reference to Firebase Auth
export const auth = getAuth()

