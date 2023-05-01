import { useEffect, useRef, useState } from "react";
import { ref, onValue, child, get, set } from "firebase/database"; 
import { db } from "../firebase_config";

// import { useLocalStorage } from ...

import Roster  from "./components/Roster";
import { CustomPopup } from "./components/Popup";
import {  db } from "./firebase_config.js"
import { useLoaderData } from "react-router";

function retrieveComponents(snapshot, update, components) {
    const temp = []
    for (var user in snapshot.toJSON()) {
        temp.push(<div key={user}><Roster user={snapshot.val()[user]} /></div>)
    }
        components.current = temp.length
        update(temp)
}

export async function lobbyLoader({ params }) {
    const snapshot = await get(child(db, `lobbies/${params.lobbyid}`))
    if (!snapshot.exists) {
        set(ref(db, `lobbies/${params.lobbyid}/metadata`), {
            "in_process": false,
            "turn": null,
          })
        return (params.lobbyid)
    }
    else if (snapshot.toJSON().in_process) {
        return null
    }
    else {
        return (params.lobbyid)
    }   
}

export default function Lobby() {
    const components = useRef(0)
    const [menus, updateMenus] = useState([])
    const [registered, updateRegistered] = useState(false) // useLocalStorage(false) 
    const lobby = useLoaderData()

    useEffect(() => {
        console.log(components.current)
        onValue(ref(db, `lobbies/${lobby}/users`), (snapshot) => {
            retrieveComponents(snapshot, updateMenus, components)
        })
    }, [components.current])

    if (!registered) {
        return(
            <>
                <h1><center>Fifa Draft</center></h1>
                {menus}
                <CustomPopup parentReg={updateRegistered} lobby={lobby} />
            </>
        )
    }

    else {
        return(
            <>
            <h1><center>Fifa Draft</center></h1>
            {menus}
            </>
        )
    }
   

}

