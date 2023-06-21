import players from '../playerdata/fifa23.json'

import { Autocomplete, TextField } from '@mui/material'

export function calculatePick(numPlayers, pick) { // Given a pick number and the amount of players, and returns the index of the player will be up to pick in the draft
    if (Math.floor(pick/numPlayers) % 2 === 1) {
        return (pick-1) % numPlayers
    }
    else {
        return (pick) % numPlayers
    }
}

export function GPTcalculatePick(n, current) { // made by GPT instead of mine
    const size = 2 * (n - 1); // Size of one complete cycle
    const cycle = Math.floor(current / size); // Number of complete cycles
    const position = current % size; // Position within the current cycle
  
    if (position < n) {
      return position; // Indices from 0 to n-1
    } else {
      return n - 1 - (position - n); // Indices from n-1 to 0
    }
  }

export function Customautocomplete({ up, inputRef }) { // code mostly copied from https://mui.com/material-ui/react-autocomplete/
    return (
        <Autocomplete
        id="playerselect"
        options={players}
        // getOptionDisabled={(option) => {taken.includes(option["Full Name"])}} // this is probably too slow
        getOptionLabel={(option) => option["Full Name"]}
        sx={{ width: 300 }}
        disabled={!up}
        renderInput={(params) => <TextField {...params} inputRef={inputRef} label="Players" />}
        />
    )
}

