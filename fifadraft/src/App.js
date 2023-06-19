

import Root from "./routes/root.js" 
import { Lobby, lobbyLoader } from "./routes/lobby.js"
import Error from "./routes/error.js"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <Error />,
    }, 
    {
        path: "lobby/:lobbyid", 
        element: <Lobby />,
        loader: lobbyLoader,
        // errorElement: <Error />,
    },
])

export default function App() {
   return (
        <RouterProvider router={router} />
   )
}

