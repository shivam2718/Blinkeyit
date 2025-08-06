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
        }}
})
export  const {handleAddItemCart   }=cartSlice.actions
export default cartSlice.reducer;