// meilisearch add
import { MeiliSearch } from 'meilisearch'
import players from './fifa23.json' assert { type: 'json' };

;(async () => {
  try {
    const config = {
      host: 'http://localhost:7700',
      APIKey: "XXEyxrFxR0qHYbT2G7ndp4ny0Ert3dYW2ci-tZBIC0Y"
    }

    const meili = new MeiliSearch(config)

    const index = meili.index('players')

    await index.addDocuments(players)
    
  } catch (e) {
    console.error(e)
    console.log('Meili error: ', e.message)
  }
})()

// firestore add
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 


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

// Create Reference to Firestore db
const db = getFirestore(app);
var batch = db.batch()

players.forEach((doc) => {
  batch.set(db.collection("players").doc(), doc)
})
batch.commit()