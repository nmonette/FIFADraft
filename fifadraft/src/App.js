import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set, get, child, push } from "firebase/database"; 
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Roster  from "./components/Roster";
import players from './playerdata/fifa23.json'

const config = {
    apiKey: "AIzaSyB1i1KcrVBmvNY1CxeKdjhM6_XIgSQ45FY",
    authDomain: "fifadraft-614b0.firebaseapp.com",
    databaseURL: "https://fifadraft-614b0-default-rtdb.firebaseio.com",
    projectId: "fifadraft-614b0",
    storageBucket: "fifadraft-614b0.appspot.com",
    messagingSenderId: "797524994217",
    appId: "1:797524994217:web:ea84780db1ca017ca261b8",
    measurementId: "G-FMGZ95DBN6"
  };

const app = initializeApp(config)
const db = getDatabase(app)
const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
    if (user) {
        get(child(ref(db), `users/${user.uid}`))
        .then((snapshot) => {
            if (!snapshot.exists()) {
                set(ref(db, 'users/' + user.uid), {
                    "name": "Nathan",
                    "uid": user.uid,
                    "roster": players.slice(0,6)
                })
            }
        })
    }
})

function checkEqual(x, y) {
    if (x.length === y.length) {
        for (var num in Array(x.length).fill(0).map((_, i) => i * i)) {
            if (x[num] !== y[num]) {
                return false
            }
        }
    }
    return true
}

function retrieveComponents(snapshot, update, components) {
    const temp = []
    for (var user in snapshot.toJSON()) {
        temp.push(<Roster user={snapshot.val()[user]} />)
    }
    console.log(temp)
    if (checkEqual(temp, components.current)) {
        components.current = temp
        update(temp)
    }
}

export default function App() {
    const components = useRef([])
    const [menus, updateMenus] = useState([])

    signInAnonymously(auth)
    .then((user) => {
        console.log(`User ${user.user.uid} has joined`)
    })
    .catch((error) => {
        console.log(`error ${error.code}: ${error.message}`)
    })

    onValue(ref(db, 'users'), (snapshot) => {
        retrieveComponents(snapshot, updateMenus, components)
    })
    return(
        <>
        <h1><center>Fifa Draft</center></h1>
        {menus}
        </>
    )
}

