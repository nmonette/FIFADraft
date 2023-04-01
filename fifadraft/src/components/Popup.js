import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import { User } from "./User.js"

import { useRef, useState } from 'react'
import { TextField, Button, Avatar } from '@mui/material'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"; 
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

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

function checkRegistered(user) {
  if (user) {
    get(child(db, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return true
      }
      return false
      return true
    })
  }
  else {
    return false
  }
}

// disabled={!checkRegistered(auth.currentUser)}

export default function CustomPopup({ users, updateUsers, menus, updateMenus }) {
    const value = useRef('')
    const [roster, updateRoster] = useState([])
    const isOpen = useRef()
    return (
    <>
    <Popup defaultOpen closeOnDocumentClick={false} ref={isOpen} trigger={<Button variant="contained" startIcon={<Avatar src={'https://www.shareicon.net/data/128x128/2015/12/01/680848_vertical_512x512.png'} />}></Button>} position="center center" modal>
        <center>
            <div><h2>Registration</h2></div>
            <div><TextField id="outlined-basic" label="Username" variant="outlined" inputRef={value} required></TextField></div>
            <div><Button variant="contained" onClick={() => {
              signInAnonymously(auth)
                .then(() => {
                  console.log(value.current.value + " is registered")
                })
              onAuthStateChanged(auth, (user) => {
                if (user && value.current.value.length !== 0) {
                  const newUser = new User({update: updateRoster, uid: user.uid, roster: roster, title: value.current.value})
                  
                  set(ref(db, 'users/' + newUser.uid), newUser.json())
      
                  updateUsers([...users, newUser])
                  updateMenus([...menus, newUser.comp])
                  isOpen.current.close()
                }
              })
            }} disableElevation>Register</Button></div>
        </center>
    </Popup>
    </>
    )
}