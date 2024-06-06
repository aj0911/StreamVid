import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthReducer } from './Reducers/AuthReducer';
import { ListsReducer } from './Reducers/ListReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  stateReconciler:autoMergeLevel2
};
const rootReducer = combineReducers({
  auth:AuthReducer.reducer,
  list:ListsReducer.reducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{
        ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
export const persistor = persistStore(store);