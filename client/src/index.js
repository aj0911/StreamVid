import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./store.js"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

const root = ReactDom.createRoot(document.querySelector('#root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persistStore(store)}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)