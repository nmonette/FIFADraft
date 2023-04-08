import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database"; 
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Roster  from "./components/Roster";
import { CustomPopup } from "./components/Popup";
import players from './playerdata/fifa23.json'
import { app, db, auth } from "./firebase_config.js"

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
        temp.push(<div key={user}><Roster user={snapshot.val()[user]} /></div>)
    }
        components.current = temp.length
        update(temp)
}


export default function App() {
    const components = useRef(0)
    const [menus, updateMenus] = useState([])


    useEffect(() => {
        signInAnonymously(auth)
        .then((user) => {
            console.log(`User ${user.user.uid} has joined`)
        })
        .catch((error) => {
            console.log(`error ${error.code}: ${error.message}`)
        })
    }, [])

    useEffect(() => {
        console.log(components.current)
        onValue(ref(db, 'users'), (snapshot) => {
            retrieveComponents(snapshot, updateMenus, components)
        })
    }, [components.current])

    console.log(menus)

    return(
        <>
        <h1><center>Fifa Draft</center></h1>
        <CustomPopup/>
        {menus[0]}
        </>
    )
}

