import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import User from "./User.js"

import { useRef, useState } from 'react'
import { TextField, Button, Avatar } from '@mui/material'





export default function CustomPopup({ users, updateUsers, menus, updateMenus }) {
    const value = useRef('')
    const [roster, updateRoster] = useState([])
    const ref = useRef()
    return (
    <>
    <Popup defaultOpen={true} closeOnDocumentClick={false} ref={ref} trigger={<Button variant="contained" startIcon={<Avatar src={'https://www.shareicon.net/data/128x128/2015/12/01/680848_vertical_512x512.png'} />}></Button>} position="center center" modal>
        <center>
            <div><h2>Registration</h2></div>
            <div><TextField id="outlined-basic" label="Username" variant="outlined" inputRef={value} required></TextField></div>
            <div><Button variant="contained" onClick={() => {
              if (value.current.value.length != 0){
                const user = new User({update: updateRoster, roster: roster, title: value.current.value})
                updateUsers([...users, user])
                updateMenus([...menus, user.comp])
                ref.current.close()
            }}} disableElevation>Register</Button></div>
        </center>
    </Popup>
    </>
    )
}