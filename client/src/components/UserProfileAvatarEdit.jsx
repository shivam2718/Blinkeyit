import React from 'react'
import { MdOutlinePermIdentity } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";
import AxiosToastError from '../utils/AxiosToastError'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import {updateAvatar} from '../store/userSlice'
const UserProfileAvatarEdit = ({close}) => {
  const user = useSelector(state=> state.user)
  const dispatch =useDispatch()
  const [loading,setloading]=useState(false)
  const handleUploadAvatarImage= async(e)=>{
   const file =e.target.files[0]
   if(!file)return;
   
   const formData=new FormData();
   formData.append('avatar',file)
   
   try{
    setloading(true)
    const response=await Axios(
    {
...SummaryApi.uploadAvatar,
data:formData,

    }
   )

    console.log("response",response) 
    dispatch(updateAvatar(response.data.data.avatar))
   }catch(error){
AxiosToastError(error)
  }
  finally{
   setloading(false)
  }
  }
  const handleSubbmit=(e)=>{
    e.preventDefault()
    
  }
  return (
   <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 p-4 flex items-center justify-center'>

    <div className='bg-white max-w-xl w-full rounded p-4 flex flex-col items-center justify-center'>
     <button onClick={close} className='text-green-800 active:scale-90 w-fit block ml-auto '>
      <MdCloseFullscreen size={25}/>
 

     </button>
    <div className='w-60 h-60 bg-zinc-200 flex items bg-center justify-center rounded-full overflow-hidden drop-shadow-lg '>
      {
        user.avatar?(
          <img
          alt={user.name}
          src={user.avatar}
          className='w-full h-full '
          />
        ):(
          <MdOutlinePermIdentity size={60}/>
        )
      }
        
         </div>
         <form onSubmit={handleSubbmit}>
          <label htmlFor="uploadProfile" >
           <div className='border border-yellow-200 hover:bg-yellow-300 px-3 py-2 mt-10 mb-3 rounded text-xl shadow-neutral-600 shadow-2xl' >
          {
            loading ? "loading...":"Upload"
          }
           </div>
          </label>
           <input type="file" onChange={handleUploadAvatarImage} id="uploadProfile" className='hidden'/>
         </form>
         
    </div>
   </section>
  )
}

export default UserProfileAvatarEdit
