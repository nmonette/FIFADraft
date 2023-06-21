import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import players from '../playerdata/fifa23.json'

import { useRef, useEffect } from 'react'
import { TextField, Button } from '@mui/material'

import { ref, set, get, child, update } from "firebase/database"; 

import { Modal, Box } from '@mui/material';

import { db, auth } from "../firebase_config.js"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

// disabled={!checkRegistered(auth.currentUser)}
// defaultOpen={!checkRegistered(auth.currentUser)}
// trigger={<Button variant="contained" startIcon={<Avatar src={'https://www.shareicon.net/data/128x128/2015/12/01/680848_vertical_512x512.png'} />}></Button>}

export function CustomPopup({ lobby, registerRef}) {
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
                  registerRef.current = true
                }
              })
            }} disableElevation>Register</Button></div>
        </center>
    </Popup>
    </>
    )
}

function shuffleArray(array) { // Durstenfeld shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export function HostPopup({ lobby, openState, updateOpen, inProgress }) {
  const rosterSize = useRef()
  const names = []

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  
  const handleStart = () => {
    get(child(ref(db), `lobbies/${lobby}`)).then((snapshot) => {
      const data = snapshot.toJSON()
      for (var uid in data.users) {
        names.push(uid)
      }
      shuffleArray(names)
      if (rosterSize.current.value !== NaN) {
        update(ref(db, `lobbies/${lobby}/metadata`), {
          turn: 0,
          order: names,
          rosterSize: Number(rosterSize.current.value),
        }).then(() => {
          console.log("draft has begun")
          inProgress.current = true
          updateOpen(false)
        })
      } 
    })
  }

  return (
    <>
      <Modal open={openState} onClose={() => {updateOpen(false)}}>
        <Box sx={style}>
        <center>
          <div><h2>Draft Settings</h2></div>
          <TextField label="Number of Picks" type="number" inputRef={rosterSize} required />
          <Button variant="contained" onClick={handleStart}>Start Draft </Button>
        </center>
        </Box>
      </Modal>
    </>
  )
}