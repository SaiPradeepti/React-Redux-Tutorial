import { configureStore } from '@reduxjs/toolkit'

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAMS = 'BUY_ICECREAMS';

// action creator - returns an action

function buyCake(){
   return {
    type: BUY_CAKE,
    info: 'First redux action'
 }
}

function buyIceCream(){
   return {
    type: BUY_ICECREAMS,
    info: 'Second redux action'
 }
}

//action is an object that has type property
// {
//     type: BUY_CAKE,
//     info: 'First redux action'
//  }

//action creator returns an action
// function buyCake(){
//    return {
//     type: BUY_CAKE,
//     info: 'First redux action'
//  }
// }

const initialState = {
    numberOfCakes: 10,
    numberOfIceCreams: 20,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numberOfCakes: state.numberOfCakes - 1,
        }
        case BUY_ICECREAMS: return {
            ...state,
            numberOfIceCreams: state.numberOfIceCreams - 1,
        }
        default: return state
    }
}

const store = configureStore({
    reducer: reducer,
});

//store allows access to the state using getState()
console.log('Initial State: ',store.getState())

// any changes to the state can we tracked using subscribe method
const unsubscribe = store.subscribe(() => console.log('Updated Store',store.getState()))

// store allows state to be updated using dispatch method
// dispatch method accepts action as argument
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

export default store;

//To unsubscribe the change listener, invoke the function returned by subscribe.
unsubscribe();


