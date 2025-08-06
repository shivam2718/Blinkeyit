import {createSlice} from '@reduxjs/toolkit';
const initialState={
    cart:[]
}
const cartSlice=createSlice({
    name:'CartItem',
    initialState:initialState,
    reducers:{
        handleAddItemCart:(state,action)=>{
state.cart= [...state.cart,action.payload]
        },
  setCartItems: (state, action) => {
    state.cart = action.payload;
  }}
})
export  const {handleAddItemCart,setCartItems}=cartSlice.actions
export default cartSlice.reducer;