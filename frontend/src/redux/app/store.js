import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import adminAuthReducer from '../features/adminSlice'
import counterReducer from '../features/counterSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {key: 'root', storage}
const persistAdminConfig = {key: 'adminRoot', storage}




const persistedauthReducer = persistReducer(persistConfig, authReducer)
const persistedadminAuthReducer = persistReducer(persistAdminConfig, adminAuthReducer)

const store = configureStore({
  reducer: {
    auth: persistedauthReducer, 
    admin: persistedadminAuthReducer, 
    counter : counterReducer
  },
    middleware: [thunk]
  })
 
export const persistor = persistStore(store);
export default store