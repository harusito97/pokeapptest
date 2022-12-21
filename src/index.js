import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import App from "./App";
import PokeData from "./PokeData";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "pokemon/:pokeid",
        element: <PokeData />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

serviceWorker.unregister();
