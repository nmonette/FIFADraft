import './App.css';

// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore"; 


// import { MeiliSearch } from 'meilisearch'
import players from './playerdata/fifa23.json'

import React from 'react'

import { Roster } from './Roster.js'

// Create Meillisearch Client
// const client = new MeiliSearch({
//   host: 'http://127.0.0.1:7700',
//   apiKey: 'Key',
// })

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


const empty = [{'id': 0, 'Known As': null, 'Full Name': null, 'Overall': null, 'Potential': null, 'Value(in Euro)': null, 'Positions Played': null, 'Best Position': '', 'Nationality': '', 'Age': '', 'Height(in cm)': '', 'Weight(in kg)': '', 'TotalStats': '', 'BaseStats': '', 'Club Name': '', 'Club Position': '', 'Preferred Foot': '', 'Weak Foot Rating': '', 'Skill Moves': '', 'National Team Name': '', 'National Team Position': '', 'Attacking Work Rate': '', 'Defensive Work Rate': '', 'Pace Total': '', 'Shooting Total': '', 'Passing Total': '', 'Dribbling Total': '', 'Defending Total': '', 'Physicality Total': '', 'Crossing': '', 'Finishing': '', 'Heading Accuracy': '', 'Short Passing': '', 'Volleys': '', 'Dribbling': '', 'Curve': '', 'Freekick Accuracy': '', 'LongPassing': '', 'BallControl': '', 'Acceleration': '', 'Sprint Speed': '', 'Agility': '', 'Reactions': '', 'Balance': '', 'Shot Power': '', 'Jumping': '', 'Stamina': '', 'Strength': '', 'Long Shots': '', 'Aggression': '', 'Interceptions': '', 'Positioning': '', 'Vision': '', 'Penalties': '', 'Composure': '', 'Marking': '', 'Standing Tackle': '', 'Sliding Tackle': '', 'Goalkeeper Diving': '', 'Goalkeeper Handling': '', ' GoalkeeperKicking': '', 'Goalkeeper Positioning': '', 'Goalkeeper Reflexes': '', 'ST Rating': '', 'LW Rating': '', 'LF Rating': '', 'CF Rating': '', 'RF Rating': '', 'RW Rating': '', 'CAM Rating': '', 'LM Rating': '', 'CM Rating': '', 'RM Rating': '', 'LWB Rating': '', 'CDM Rating': '', 'RWB Rating': '', 'LB Rating': '', 'CB Rating': '', 'RB Rating': '', 'GK Rating': ''}]

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

export default function App() {
  let Nathan = new User({title: "Nathan"})
  let Sam = new User({title: "Sam"})
  let Cam = new User({title: "Cam"})

  let users = [Nathan, Sam, Cam]
  const rosters = users.map((user) => <div key={user.id}><Roster user={user}/></div>)

  return  (
    <>
      <div><center><h1>FIFADraft</h1></center></div>
      {rosters}
    </>
  )
}