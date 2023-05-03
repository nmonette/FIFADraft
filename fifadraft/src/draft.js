import players from './playerdata/fifa23.json'

import { Autocomplete, TextField } from '@mui/material'

export function calculatePick(numPlayers, pick) { // Given a pick number and the amount of players, and returns the index of the player will be up to pick in the draft
    if (Math.floor(pick/numPlayers) % 2 === 1) {
        return (pick-1) % numPlayers
    }
    else {
        return -pick % numPlayers
    }
}

function CustomAutoComplete() { // code copied from https://mui.com/material-ui/react-autocomplete/
    return (
        <>
            <Autocomplete
            id="playerselect"
            options={players}
            getOptionDisabled={(option) =>
                option === timeSlots[0] || option === timeSlots[2]
            }
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Disabled options" />}
            />
        </>
    )
}

