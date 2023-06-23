import { Modal, Button, Box, Typography, Grid } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import cryptoRandomString from 'crypto-random-string';
import { RootBar } from "../components/Toolbar";

export default function Root() {
    let [modalOpen, setOpen] = useState(false);

    const lobby = cryptoRandomString({ length:12 })

    const lobby_link = `/FIFADraft/lobby/${lobby}`

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
        navigator.clipboard.writeText("nmonette.github.io" + lobby_link)
        navigate(lobby_link)
    }
    return (
        <>
        <RootBar buttonClick={() => setOpen(true)}/>
        <center>
        <Modal open={modalOpen} aria-labelledby="modal-modal-title" variant="h6" component="h2" onClose={() => {setOpen(false)}}>
            <div>
                <Box sx={style}>
                    <Typography sx={{mb:3}} id="modal-modal-title" variant="h6" component="center">
                        This button will redirect to the lobby, as well as copy the link to your clipboard.
                    </Typography>
                    <center>
                        <Button onClick={handleClick} variant="contained" disableElevation>New Lobby</Button>
                    </center>
                </Box>
            </div>
        </Modal>
        </center>
        <Typography sx={{mt:3}} variant="h3" component="center" fontFamily="arial black">Welcome to FIFA Draft</Typography>
        <Typography sx={{mt:3}} variant="h6" component="center" fontFamily="arial black">
            To get started, click CREATE LOBBY.
            Share the link with friends, and click START DRAFT when ready! 
        </Typography>
        </> 
    )
}
