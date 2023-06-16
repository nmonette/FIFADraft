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
    try {
        const snapshot = await get(child(ref(db), `lobbies/${params.lobbyid}/metadata`));
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
    const [up, updateUp] = useState(false)
    const player = useRef("")
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

    if (lobby !== lobby_record) { // add "draft in session" snackbar component
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

