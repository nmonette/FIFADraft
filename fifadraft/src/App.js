import './App.css';

// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore"; 


import { MeiliSearch } from 'meilisearch'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import players from './playerdata/fifa23.json'

import React from 'react'

import { Roster } from './Roster.js'

// const firebaseConfig = {
//   apiKey: "AIzaSyB1i1KcrVBmvNY1CxeKdjhM6_XIgSQ45FY",
//   authDomain: "fifadraft-614b0.firebaseapp.com",
//   projectId: "fifadraft-614b0",
//   storageBucket: "fifadraft-614b0.appspot.com",
//   messagingSenderId: "797524994217",
//   appId: "1:797524994217:web:ea84780db1ca017ca261b8",
//   measurementId: "G-FMGZ95DBN6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Create Reference to Firestore db
// const db = getFirestore(app);

let playercount = 0

class User {
  constructor({ title="error_title" }) {
    this.title = title
    this.roster = [] 
    playercount += 1
    this.id = playercount
  }


  addPlayer({ player }) {
    this.roster.push(player)
  }
}

async function addDocs() {
  // Create Meillisearch Client
  const client = new instantMeiliSearch(
    "http://localhost:7700",
    "XXEyxrFxR0qHYbT2G7ndp4ny0Ert3dYW2ci-tZBIC0Y"
  )
  
  let index = client.index("players")
  let response = await index.addDocuments(players)
  console.log(response)

  return client
}

export default function App() {
  let Nathan = new User({title: "Nathan"})
  let Sam = new User({title: "Sam"})
  let Cam = new User({title: "Cam"})

  let users = [Nathan, Sam, Cam]
  const rosters = users.map((user) => <div key={user.id}><Roster user={user}/></div>)

  const client = addDocs()
  
  const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;

  return  (
    <>
      <div><center><h1>FIFADraft</h1></center></div>
      <div><center>
      <InstantSearch indexName="players" searchClient={client}><SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
      </center></div>
      {rosters}
    </>
  )
}