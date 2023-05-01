import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { useRef } from "react";

export default function Root() {
    let modalOpen = false;
    let name = useRef("")
    return (
        <>
        <Typography id="heading" variant="h6" component="h1">FIFA Draft</Typography>
        <Button variant="contained" onclick={() => {modalOpen = true}} >Create Game</Button>
        <Modal open={modalOpen} aria-labelledby="modal-modal-title" variant="h6" component="h2">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Click to Copy:
            </Typography>
            <div>
                <TextField id="outlined-basic" label="Name" variant="outlined" inputRef={name} required></TextField> 
            </div>
        </Modal>
        </> 
    )
}
