import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorContextProvider from "./hookies/context/ErrorContext";
import CRUDContextProvider from "./hookies/context/CRUDContext";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorContextProvider>
                <CRUDContextProvider>
                    <App />
                </CRUDContextProvider>
            </ErrorContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
