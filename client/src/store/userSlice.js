import { createSlice } from '@reduxjs/toolkit';

const initialvalue = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: false,
  last_login_date: null,
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialvalue,
  reducers: {
    setUserDetails: (state, action) => {
      return {
        ...state,
        _id: action.payload?._id || "",
        name: action.payload?.name || "",
        email: action.payload?.email || "",
        avatar: action.payload?.avatar || "",
        mobile: action.payload?.mobile || "",
        verify_email: action.payload?.verify_email || false,
        last_login_date: action.payload?.last_login_date || null,
        status: action.payload?.status || "",
        address_details: [...(action.payload?.address_details || [])],
        shopping_cart: [...(action.payload?.shopping_cart || [])],
        orderHistory: [...(action.payload?.orderHistory || [])],
        role: action.payload?.role || "",
      };
    },
    updateAvatar: (state, action) => {
      return {
        ...state,
        avatar: action.payload?.avatar || "",
      };
    },
    logout: () => {
      return { ...initialvalue };
    },
  },
});

export const { setUserDetails, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
