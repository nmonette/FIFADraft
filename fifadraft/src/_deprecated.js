import './App.css';

import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue } from "firebase/database"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { MeiliSearch } from 'meilisearch'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import players from './playerdata/fifa23.json'

import React from 'react'
import { useState, useEffect } from 'react';

import  { CustomPopup } from './components/Popup.js'
import User from './User.js'
import Button from '@mui/material/Button';



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
const db = getDatabase(app);

export default function App() {
  let [menus, updateMenus] = useState([])
  let [users, updateUsers] = useState([])

  onValue(ref(db, 'users/'), (snapshot) => {
    const data = snapshot.val()

    var temp = []
    for (var user in data) {
      temp.push(new User({roster: [], uid: user.uid, title: user.title}))
    }
      updateUsers(temp)
      updateMenus(users.map(user => {
        <div key={user.uid}>{user.comp}</div>
      }))

  })


  return  (
    <>
    <CustomPopup/>
      <div><center><h1>FIFADraft</h1></center></div>
      <div><center>
        <Button variant="contained" onClick={users.addPlayer} disableElevation>
          Select player
        </Button>
      </center></div>
      {menus}
    </>
  )
}