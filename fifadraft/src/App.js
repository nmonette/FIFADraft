import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database"; 
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Roster  from "./components/Roster";
import { CustomPopup } from "./components/Popup";
import players from './playerdata/fifa23.json'
import { app, db, auth } from "./firebase_config.js"

import Root from "./routes/root.js" 
import { Lobby, lobbyLoader } from "./routes/lobby.js"
import Error from "./routes/error.js"

import { createBrowserRouter, RouterProvider } from "react-router"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    }, 
    {
        path: "lobby/:lobbyid", 
        element: <Lobby />,
        loader: lobbyLoader,
        errorElement: <Error />,
    },
])

export default function App() {
   return (
        <RouterProvider router={router} />
   )
}

