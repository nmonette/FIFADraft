import { Modal, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

import { ref, set } from "firebase/database"; 
import { db } from "../firebase_config";

import { useNavigate } from "react-router-dom";

import cryptoRandomString from 'crypto-random-string';

export default function Root() {
    let [modalOpen, setOpen] = useState(false);

    const lobby = cryptoRandomString({ length:12 })

    const lobby_link = `/lobby/${lobby}`

    const navigate = useNavigate()

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

    const handleClick = () => {
        set(ref(db, `lobbies/${lobby}/metadata`), {
            "turn": -1,
          }).then(
            () => navigate(lobby_link)
          )
        // navigator.clipboard.writeText("localhost:3000" + lobby_link)
    }
    return (
        <>
        <center>
        <Typography id="heading" variant="h6" component="h1">FIFA Draft</Typography>
        <Button variant="contained" onClick={() => setOpen(true)} disableElevation>Create Lobby</Button>
        <Modal open={modalOpen} aria-labelledby="modal-modal-title" variant="h6" component="h2">
            <div>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h3">
                        This button will redirect, as well as copy the link to your clipboard.
                    </Typography>
                    <center>
                        <Button onClick={handleClick} variant="contained" disableElevation>New Lobby</Button>
                    </center>
                </Box>
            </div>
        </Modal>
        </center>
        </> 
    )
}
