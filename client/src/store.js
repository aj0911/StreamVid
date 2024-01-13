import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import {Auth} from "./Reducers/Auth";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { ListsReducer } from "./Reducers/ListsReducer";


const rootReducer = combineReducers({
    auth:Auth.reducer,
    lists:ListsReducer.reducer
})

const store = configureStore({
    reducer:persistReducer({
        key:'root',
        version:1,
        storage
    },rootReducer)
})

export default store;