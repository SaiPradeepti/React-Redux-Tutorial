import { configureStore, combineReducer } from "@reduxjs/toolkit";
import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import axios from 'axios'

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())
        //     .then (data => {
        //         dispatch(fetchUsersSuccess(data));
        //     })
        //     .catch( error => {
        //         dispatch(fetchUsersFailure(error.message));
        //     })
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                console.log(response)
                dispatch(fetchUsersSuccess(response.data));
            })
            .catch( error => {
                dispatch(fetchUsersFailure(error.message));
            })
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true,
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users: [],
            error: action.payload
        }
        default: return state
    }
}

const store = configureStore({
    reducer: reducer,
},applyMiddleware(thunk))

export default store
store.subscribe(()=>console.log(`Updated State: ${store.getState()}`))
store.dispatch(fetchUsers())


