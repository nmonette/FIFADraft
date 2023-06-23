

import Root from "./routes/root.js" 
import { Lobby, lobbyLoader } from "./routes/lobby.js"
import Error from "./routes/error.js"

import { createHashRouter, RouterProvider } from "react-router-dom"



const router = createHashRouter([
    {
        path: "/FIFADraft",
        element: <Root />,
        errorElement: <Error />,
    }, 
    {
        path: "/FIFADraft/lobby/:lobbyid", 
        element: <Lobby />,
        loader: lobbyLoader,
        errorElement: <Error />,
    },
]) // , {basename:"/FIFADraft"} 

export default function App() {
    document.title = "FIFA Draft"
   return (
        <RouterProvider router={router} />
   )
}

