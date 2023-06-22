import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

export function RootBar ({ buttonClick }) {
    return(
        <>
            <AppBar position="sticky">
            <Toolbar >
                <Typography variant="h4" component="a" href="/" sx={{flexGrow: 1, color: 'inherit', textDecoration: 'none', fontFamily: 'arial black', display: {xs: 'none', sm: 'block'}}}>FIFA Draft</Typography>
                <Button color="inherit" onClick={buttonClick} sx={{fontFamily: "arial black",}} >Create Lobby</Button>
            </Toolbar>
            </AppBar>
        </>
    )
}

export function LobbyBar () {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                <Typography variant="h4" component="a" href="/" sx={{flexGrow: 1, color: 'inherit', textDecoration: 'none', fontFamily: 'arial black', display: {xs: 'none', sm: 'block'}}}>FIFA Draft</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export function HostBar ({ buttonClick }) {
    return(
        <>
            <AppBar position="sticky">
            <Toolbar >
                <Typography variant="h4" component="a" href="/" sx={{flexGrow: 1, color: 'inherit', textDecoration: 'none', fontFamily: 'arial black', display: {xs: 'none', sm: 'block'}}}>FIFA Draft</Typography>
                <Button color="inherit" onClick={buttonClick} sx={{fontFamily: "arial black",}} >Start Draft</Button>
            </Toolbar>
            </AppBar>
        </>
    )
}