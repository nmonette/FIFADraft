import players from '../playerdata/fifa23.json'

import { Autocomplete, TextField } from '@mui/material'

export function calculatePick(numPlayers, pick) { // Given a pick number and the amount of players, and returns the index of the player will be up to pick in the draft
  Number.prototype.mod =  function(n) { // from https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
    return ((this%n)+n)%n;
    }
  
  if (Math.ceil( (pick+1) / numPlayers) % 2 === 1) {
        return pick % numPlayers
    }
    else {
        return (-pick-1).mod(numPlayers)
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

