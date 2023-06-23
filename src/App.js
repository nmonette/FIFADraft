

import Root from "./routes/root.js" 
import { Lobby, lobbyLoader } from "./routes/lobby.js"
import Error from "./routes/error.js"

import { createHashRouter, RouterProvider } from "react-router-dom"



const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
    },
    {
        path: "lobby/:lobbyid", 
        element: <Lobby />,
        loader: lobbyLoader,
        errorElement: <Error />,
    }
], {shimErrors: true}) // , {basename:"localhost:3000/FIFADraft"}

export default function App() {
    document.title = "FIFA Draft"
   return (
        <RouterProvider router={router} basename={"/FIFADraft"} />
   )
}

