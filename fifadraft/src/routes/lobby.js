import { useEffect, useRef, useState } from "react";
import { ref, onValue, child, get } from "firebase/database"; 
import { db } from "../firebase_config";

import { useLocalStorage } from "../hooks.js"

import Roster  from "../components/Roster";
import { CustomPopup } from "../components/Popup";
import { useLoaderData } from "react-router-dom";

function retrieveComponents(snapshot, update, components) {
    const temp = []
    for (var user in snapshot.toJSON()) {
        temp.push(<div key={user}><Roster user={snapshot.val()[user]} /></div>)
    }
        components.current = temp.length
        update(temp)
}

export async function lobbyLoader({ params }) {
    // console.log(params.lobbyid)
    try {
        const snapshot = await get(child(ref(db), `lobbies/${params.lobbyid}/metadata`));
        console.log(snapshot)
        if (snapshot.toJSON().turn !== -1) {
            return null
        }
        else {
            return (params.lobbyid)
        } 
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export function Lobby() {
    const components = useRef(0)
    const [menus, updateMenus] = useState([])
    const [lobby_record, updateLobby] = useLocalStorage() 
    const lobby = useLoaderData()

    useEffect(() => {
        onValue(ref(db, `lobbies/${lobby}/users`), (snapshot) => {
            if (snapshot.exists) {
                retrieveComponents(snapshot, updateMenus, components)
            }
        })
    }, [components.current])

    if (lobby !== lobby_record) {
        return(
            <>
                <h1><center>Fifa Draft</center></h1>
                {menus}
                <CustomPopup parentReg={updateLobby} lobby={lobby} />
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

