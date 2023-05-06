import players from '../playerdata/fifa23.json'

import { Autocomplete, TextField } from '@mui/material'

export function calculatePick(numPlayers, pick) { // Given a pick number and the amount of players, and returns the index of the player will be up to pick in the draft
    if (Math.floor(pick/numPlayers) % 2 === 1) {
        return (pick-1) % numPlayers
    }
    else {
        return -pick % numPlayers
    }
}

export function Customautocomplete({ taken, up, inputRef }) { // code mostly copied from https://mui.com/material-ui/react-autocomplete/
    return (
        <Autocomplete
        id="playerselect"
        options={players}
        getOptionDisabled={(option) => taken.includes(option["Full Name"])}
        getOptionLabel={(option) => option["Full Name"]}
        sx={{ width: 300 }}
        disabled={!up}
        renderInput={(params) => <TextField {...params} inputRef={inputRef} label="Disabled options" />}
        />
    )
}

