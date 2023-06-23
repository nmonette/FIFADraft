import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const app = initializeApp(firebaseConfig);
  
  // Create Reference to Firebase Realtime DB
  const db = getDatabase(app);

  // Create Reference to Firebase Auth
  const auth = getAuth()

  // When someone logs in
  onAuthStateChanged(auth, (user) => {
    if (user) {
        
    }
  })

