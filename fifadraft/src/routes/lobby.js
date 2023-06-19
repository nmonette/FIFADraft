import { useEffect, useRef, useState } from "react";
import { ref, onValue, child, get, set, update } from "firebase/database"; 
import { db, auth } from "../firebase_config";

import { useLocalStorage } from "../hooks"

import Roster  from "../components/Roster";
import { CustomPopup } from "../components/Popup";
import { useLoaderData } from "react-router-dom";

import { Customautocomplete, calculatePick } from "../components/Draft"

import { Button, Snackbar, Alert } from "@mui/material";

import players from "../playerdata/fifa23.json"
 
export async function lobbyLoader({ params }) {
    let in_progress = false
    let registered = false
    // fix loader so that it will change lobby for when you join an in-progress draft... this means returning a larger object from the loader and then accessing it with useLoaderData()
    try {
        const snapshot = await get(child(ref(db), `lobbies/${params.lobbyid}`));
        if (!snapshot.exists() ) {
            await set(ref(db, `lobbies/${params.lobbyid}/metadata`), {
                "turn": -1,
                "taken": 0,
              })
            return {
                lobby: params.lobbyid,
                registered: false, // fix this so that when they log on for the first time, this still lets them draft
                in_progress: false,
            }
        }
        else if (snapshot.toJSON().users === undefined) {
            return {
                lobby: params.lobbyid,
                registered: false, 
                in_progress: false,
            }
        }
        else {
            console.log(`turn:  ${snapshot.toJSON().metadata.turn}`)
            if (snapshot.toJSON().metadata.turn !== -1) {
                in_progress = true
            }
            if (auth.currentUser !== null && auth.currentUser.uid in snapshot.toJSON().users) {
                registered = true;
            }
            return {
                lobby: params.lobbyid,
                registered: registered,
                in_progress: in_progress,
            }
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
    const loaderData = useLoaderData()
    const lobby = loaderData.lobby
    const player = useRef("")
    let pickNumber = useRef(0)
    let registered = useRef(false)
    let disableList = useRef([])
    const [errorOpen, updateError] = useState(false)
    const [successOpen, updateSuccess] = useState(false)

    const handlePick = () => {
        console.log(disableList)
        if (!disableList.current.includes(player.current.value)) {
            get(child(ref(db), `lobbies/${lobby}`)).then((snapshot) => {
                    const pick = players.filter((item) => (item["Full Name"] === player.current.value))[0]
                    const data = snapshot.exportVal()
                    const user = data["users"][auth.currentUser.uid]

                    var roster = []
                    var taken = []
                    if (user.roster !== 0) {roster = Object.values(user.roster)}
                    if (data.metadata.taken !== 0) {taken = Object.values(data.metadata.taken)} 
                    
                    update(ref(db, `lobbies/${lobby}/users/${auth.currentUser.uid}`), {
                        "roster": [...roster, pick],
                    }).then(() => {
                        update(ref(db, `lobbies/${lobby}/metadata`), {
                            "turn": data.metadata.turn + 1, // we need to modify "up" from this
                            "taken": [...taken, pick["Full Name"]],
                        })
                    })
                }
            )
            updateSuccess(true)
        }
        else {
            updateError(true)
        }
    }

    useEffect(() => {
        onValue(ref(db, `lobbies/${lobby}`), (snapshot) => {
            if (lobby === null) {
                throw Error();
            }
            if (snapshot.exists) {
                const temp = []
                const data = snapshot.toJSON()

                pickNumber.current = data.metadata.turn

                for (var user in data.users) {
                    temp.push(<div key={user}><Roster user={data.users[user]} /></div>)
                }
                components.current = temp.length
                updateMenus(temp)
                if (data.metadata.taken !== 0) {
                    disableList.current = Object.values(data.metadata.taken)
                }
            }
        })
    }, [components.current])

    if (!loaderData.registered && !loaderData.in_progress && !registered.current) { 
        // registered.current = true
        return(
            <>
                <h1><center>Fifa Draft</center></h1>
                {menus}
                <CustomPopup parentReg={updateLobby} lobby={lobby} registerRef={registered} />
            </>
        )
    }
    else if (!loaderData.registered && loaderData.in_progress && !registered.current) { // add "draft in session" snackbar component
        return (
            <>
                <center>
                    <h1>Fifa Draft</h1>
                </center>
                {menus}
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={true} autoHideDuration={4000} onClose={() => updateError(false)}><Alert variant ="filled" severity="error">Draft already in progress</Alert></Snackbar>
            </>
        )
    }
    else if (loaderData.registered || registered.current) {
        return(
            <>
                <center>
                    <h1>Fifa Draft</h1>
                    <Customautocomplete up={true} inputRef={player} />
                    <div><Button variant="contained" onClick={handlePick} disableElevation required> Draft Player</Button></div>
                </center>
                {menus}
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={errorOpen} autoHideDuration={4000} onClose={() => updateError(false)}><Alert variant ="filled" severity="error">Player already taken</Alert></Snackbar>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={successOpen} autoHideDuration={4000} onClose={() => updateSuccess(false)}><Alert variant ="filled" severity="success">Player taken successfully</Alert></Snackbar>
            </>
        )
    }

}

