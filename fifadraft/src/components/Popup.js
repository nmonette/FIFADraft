import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import Roster from './Roster';

import { useRef, useState } from 'react'
import { TextField, Button, Avatar } from '@mui/material'

let playercount = 0

class User {
    constructor({ update, roster, title="error_title"}) {
      this.title = title
      this.roster = roster
      playercount += 1
      this.id = playercount
      this.update = update
      this.comp = <Roster user={this}/>
    }
  
    addPlayer({ player }) {
      this.roster = [...this.roster, player]
      this.update(this.roster)
  
    }
  }

export default function CustomPopup({ users, updateUsers, menus, updateMenus }) {
    const value = useRef('')
    const [roster, updateRoster] = useState([])
    return (
    <>
    <Popup trigger={<Button variant="contained" startIcon={<Avatar src={'https://www.shareicon.net/data/128x128/2015/12/01/680848_vertical_512x512.png'} />}></Button>} position="center center" modal>
        <center>
            <div><h2>Enter Username</h2></div>
            <div><TextField id="outlined-basic" label="Username" variant="outlined" inputRef={value} required></TextField></div>
            <div><Button variant="contained" onClick={() => {
                const user = new User({update: updateRoster, roster: roster, title: value.current.value})
                updateUsers([...users, user])
                updateMenus([...menus, user.comp])
            }} disableElevation>Register</Button></div>
        </center>
    </Popup>
    </>
    )
}