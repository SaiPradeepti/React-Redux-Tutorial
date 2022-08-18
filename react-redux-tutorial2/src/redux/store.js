import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cakeReducer from './cakes/cakeReducer'

const store = configureStore({
    reducer: cakeReducer,
})

export default store