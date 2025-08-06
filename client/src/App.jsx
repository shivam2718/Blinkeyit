import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footers from './components/Footers'
import GlobalProvider from './provider/GlobalProvider'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import {setUserDetails} from './store/userSlice'
import { useDispatch } from 'react-redux';
import {setAllCategory,setAllSubCategory,setLoadingCategory} from './store/productSlice'
import Axios from './utils/axios';
import SummaryApi from './common/SummaryApi';
import {handleAddItemCart} from './store/cartProduct';
function App() {
   const dispatch = useDispatch()
   const fetchUser=async()=>{
    const userData = await fetchUserDetails()
     if (userData?.data) { // Check if data exists
        dispatch(setUserDetails(userData.data))
      }
   } 
    const fetchCategory = async()=>{
    try {
      dispatch(setLoadingCategory(true))
      const response =await Axios({
    ...SummaryApi.getCategory,
  })
      const {data:responseData}=response
     
      if(responseData.success){
         dispatch(setAllCategory (responseData.data))
      

      }
    } catch (error) {
      
    }
    finally{
      dispatch(setLoadingCategory(false))
      }
  } 

    const fetchSubCategory = async()=>{
    try {
     
      const response =await Axios({
    ...SummaryApi.getSubcategory,
  })
      const {data:responseData}=response
     
      if(responseData.success){
         dispatch(setAllSubCategory(responseData.data))
      

      }
    } catch (error) {
      
    }
    finally{
      }
  } 

   useEffect(()=>{
      fetchCategory()
    fetchUser()
    fetchSubCategory()
    //fetchCartitem()
   },[])
  return (
  <GlobalProvider>
  <Header/>
   <main className='min-h-[78vh]'>
    <Outlet/>
   </main>
   <Footers/>
   <Toaster/>
   </GlobalProvider>
  )
}
export default App