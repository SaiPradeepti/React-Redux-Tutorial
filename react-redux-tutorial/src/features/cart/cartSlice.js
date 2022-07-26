import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (thunkAPI) => {
    const res = await fetch(url).then(res => res.json()).catch(err=>console.log(err));
    console.log(res)
    return res;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id!== itemId);
            console.log(`removing an item ${itemId}`)
        },
        increase: (state, action) =>{
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => item.id === itemId)
            cartItem.amount += 1
        },
        decrease: (state, action) =>{
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => item.id === itemId)
            cartItem.amount -= 1
        },
        calculateTotals: (state, action) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach( item => {
                amount += item.amount
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total.toFixed(2);
        },
        extraReducers: {
            [getCartItems.pending]: (state) =>{
                state.isLoading = true
            },
            [getCartItems.fulfilled]: (state,action) =>{
                console.log(action.payload)
                state.isLoading = false
                state.cartItems = action.payload
            },
            [getCartItems.rejected]: (state,action) =>{
                state.isLoading = false
            } 
        }
    }
})

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;

export default cartSlice.reducer;