import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import players from '../playerdata/fifa23.json'

import { useRef, useEffect } from 'react'
import { TextField, Button } from '@mui/material'

import { ref, set, get, child } from "firebase/database"; 

import { Divider } from '@mui/material';

import { db, auth } from "../firebase_config.js"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

// disabled={!checkRegistered(auth.currentUser)}
// defaultOpen={!checkRegistered(auth.currentUser)}
// trigger={<Button variant="contained" startIcon={<Avatar src={'https://www.shareicon.net/data/128x128/2015/12/01/680848_vertical_512x512.png'} />}></Button>}

export function CustomPopup({ parentReg, lobby }) {
    const name_value = useRef("")
    const isOpen = useRef()

    return (
    <>
    <Popup defaultOpen={true} closeOnEscape={false} closeOnDocumentClick={false} ref={isOpen}  position="center center" modal>
        <center>
            <div><h2>Registration</h2></div>
            <div><TextField id="outlined-basic" label="Username" variant="outlined" inputRef={name_value} required></TextField></div>
            <div><Button variant="contained" onClick={() => {
              signInAnonymously(auth)
                .then(() => {
                  console.log(name_value.current.value + " is registered")
                })
              onAuthStateChanged(auth, (user) => {
                if (user && name_value.current.value.length !== 0) {                  
                  set(ref(db, `lobbies/${lobby}/users/` + user.uid), {
                    "title": name_value.current.value,
                    "roster": 0,
                    "uid": user.uid
                  })
                  isOpen.current.close()
                  parentReg(lobby)
                }
              })
            }} disableElevation>Register</Button></div>
        </center>
    </Popup>
    </>
    )
}