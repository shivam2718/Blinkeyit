import {createContext,useContext, useEffect} from "react";
import { useDispatch } from 'react-redux';
import AxiosToastError from "../utils/AxiosToastError";
import Axios from '../utils/axios';
import SummaryApi from '../common/SummaryApi';
import {handleAddItemCart} from '../store/cartProduct';
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider=({children})=>{
    const fetchCartitem = async() => {
  try {
    const response = await Axios({
      ...SummaryApi.getCartItem
    })
    const {data: responseData} = response
    if(responseData.success) {
      dispatch(handleAddItemCart(responseData.data));
      // Dispatch to Redux
    }
  } catch(error) {
    console.log(error) 
  }
}
 const updateCartItemQty = async (_id, qty) => {
  try {
    const response = await Axios({
      ...SummaryApi.updateCartItemQty,
      data: {
        _id,
        qty
      }
    })
    const {data: responseData} = response
    if(responseData.success) {
      dispatch(handleAddItemCart(responseData.data));
      // Dispatch to Redux
    }
  } catch(error) {
    AxiosToastError(error);
  }
}

useEffect(() => {
  fetchCartitem()
}, [])
return (
<GlobalContext.Provider value={{fetchCartitem,updateCartItemQty}}>
{children}
</GlobalContext.Provider>
)
}
export default GlobalProvider;