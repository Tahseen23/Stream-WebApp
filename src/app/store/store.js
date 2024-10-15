import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { moviesSlice } from './moviesSlice.js'
import moviesReducer from './moviesSlice.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer=combineReducers({
  movieData:moviesReducer
})

const persistedReducer=persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer: persistedReducer
})


