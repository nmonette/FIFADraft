import { useEffect, useRef, useState } from "react";
import { ref, onValue, child, get, set, update } from "firebase/database"; 
import { db, auth } from "../firebase_config";


import Roster  from "../components/Roster";
import { CustomPopup, HostPopup } from "../components/Popup";
import { useLoaderData } from "react-router-dom";

import { Customautocomplete, calculatePick } from "../components/Draft"

import { Button, Snackbar, Alert, Typography, IconButton } from "@mui/material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

import players from "../playerdata/fifa23.json"
 
export async function lobbyLoader({ params }) {
    let in_progress = false
    let registered = false
    let host = false
    try {
        const snapshot = await get(child(ref(db), `lobbies/${params.lobbyid}`));
        if (!snapshot.exists() ) {
            await set(ref(db, `lobbies/${params.lobbyid}/metadata`), {
                "turn": -1,
                "taken": 0,
              })
            return {
                lobby: params.lobbyid,
                registered: false, 
                in_progress: false,
                host: true,
            }
        }
        else if (snapshot.toJSON().users === undefined) {
            return {
                lobby: params.lobbyid,
                registered: false, 
                in_progress: false,
                host: false,
            }
        }
        else {
            console.log(`turn:  ${snapshot.toJSON().metadata.turn}`)
            if (snapshot.toJSON().metadata.turn !== -1) {
                in_progress = true;
            }
            if (auth.currentUser !== null && auth.currentUser.uid in snapshot.toJSON().users) {
                registered = true;
            }
            if (auth.currentUser !== null && auth.currentUser.uid === snapshot.toJSON().metadata.host) {
                host = true;
            }
            return {
                lobby: params.lobbyid,
                registered: registered,
                in_progress: in_progress,
                host: false, // add if statement to check if host via auth.currentUser.uid
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
    const loaderData = useLoaderData()
    const lobby = loaderData.lobby
    const player = useRef("")
    let registered = useRef(false)
    let disableList = useRef([])
    let playerUp = useRef("")
    let inProgress = useRef(false)
    const [errorOpen, updateError] = useState(false)
    const [successOpen, updateSuccess] = useState(false)
    const [hostOpen, updateHost] = useState(false)

    const [draftFinished, updateFinished] = useState(false)

    const handlePick = () => {
        if (!disableList.current.includes(player.current.value)) {
            get(child(ref(db), `lobbies/${lobby}`)).then((snapshot) => {
                    const data = snapshot.exportVal()
                    const pick = players.filter((item) => (item["Full Name"] === player.current.value))[0]
                    pick["Pick Number"] = data.metadata.turn + 1
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
                
                if (data.metadata.turn !== -1) {
                    const pick = calculatePick(Object.keys(data.users).length, data.metadata.turn)
                    const uidUp = Object.values(data.metadata.order)[pick]
                    console.log(pick)
                    playerUp.current = {
                        uid: uidUp,
                        name: data.users[uidUp].title,
                    }
                }
                for (var user in data.users) {
                    temp.push(<div key={user}><Roster user={data.users[user]} /></div>)
                }
                components.current = temp.length
                updateMenus(temp)
                if (data.metadata.taken !== 0) {
                    disableList.current = Object.values(data.metadata.taken)
                }
                if (data.metadata.turn !== -1 && data.metadata.turn  === data.metadata.rosterSize * Object.keys(data.users).length) {
                    // const playerdata = []
                    // for (var user in data.users) {
                    //     for (var [index, player] in Object.entries(data.users[user].roster)) {
                    //         player["User"] = Number(index)
                    //         playerdata.push(player)
                    //     }
                    // }
                    updateFinished(true)
                }
            }
        })
    }, [components.current])

    if (draftFinished) {
        return (
            <>
                <h1><center>Fifa Draft</center></h1>
                <center><Typography sx={{color: "red"}} variant="h4">Draft has concluded</Typography></center> 
                {menus} 
                {/* confetti here */}
            </>
        )
    }
    else if (!loaderData.registered && !loaderData.in_progress && !registered.current) { 
        return(
            <>
                <h1><center>Fifa Draft</center></h1>
                {menus}
                <CustomPopup lobby={lobby} registerRef={registered} />
            </>
        )
    }
    else if (loaderData.host && !(loaderData.in_progress || inProgress.current)) {
        return (
            <>
                <center>
                    <h1>Fifa Draft</h1>
                    <Typography sx={{color: "red"}} variant="h4">{playerUp.current.name} is up to pick!</Typography>  
                    <Customautocomplete up={true} inputRef={player} disabled={!(auth.currentUser.uid === playerUp.current.uid)} />
                    <div><Button variant="contained" onClick={handlePick} disabled={!(auth.currentUser.uid === playerUp.current.uid)} disableElevation required> Draft Player</Button></div>
                    <IconButton variant="contained" onClick={() => updateHost(true)}><PlayCircleFilledIcon/></IconButton>
                    <HostPopup lobby={lobby} openState={hostOpen} updateOpen={updateHost} inProgress={inProgress} />
                </center>
                {menus}
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={errorOpen} autoHideDuration={4000} onClose={() => updateError(false)}><Alert variant ="filled" severity="error">Player already taken</Alert></Snackbar>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={successOpen} autoHideDuration={4000} onClose={() => updateSuccess(false)}><Alert variant ="filled" severity="success">Player taken successfully</Alert></Snackbar>
            </>
        )
    }

    else if (!loaderData.registered && loaderData.in_progress && !registered.current) { // add "draft in session" snackbar component
        return (
            <>
                <center>
                    <h1>Fifa Draft</h1>
                    <Typography sx={{color: "red"}} variant="h4">{playerUp.current.name} is up to pick!</Typography> 
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
                    <Typography sx={{color: "red"}} variant="h4">{playerUp.current.name} is up to pick!</Typography>  
                    <Customautocomplete up={true} inputRef={player} disabled={(auth.currentUser.uid !== playerUp.current.uid)} />
                    <div><Button variant="contained" onClick={handlePick} disabled={(auth.currentUser.uid !== playerUp.current.uid)} disableElevation required> Draft Player</Button></div>
                </center>
                {menus}
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={errorOpen} autoHideDuration={4000} onClose={() => updateError(false)}><Alert variant ="filled" severity="error">Player already taken</Alert></Snackbar>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={successOpen} autoHideDuration={4000} onClose={() => updateSuccess(false)}><Alert variant ="filled" severity="success">Player taken successfully</Alert></Snackbar>
            </>
        )
    }

}

