import React, { useEffect , useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Axios from '../utils/axios';
import AxiosToastError from '../utils/AxiosToastError';

const ResetPassword = () => {
    const location =useLocation()
    const navigate =useNavigate()
    const [data,setData]=useState({
    email:"",
    newPassword:"",
    confirmPassword:""
    })
      const [showPassword , setShowPassword] =useState(false)
      const [showconfirmPassword , setShowConfirmPassword] =useState(false)

    useEffect(()=>{
      if(!(location?.state?.data?.success)){
        navigate('/')
      }
      if(location?.state?.email){
        setData((prev)=>{
          return {
            ...prev,
            email : location?.state?.email
          }
        })
      }

    },[])
    const handleChange=(e)=>{
     const {name,value}=e.target
     setData((preve)=>{
     return{
        ...preve,
        [name]:value
     }
     })
    }
    console.log("data reset password")
    console.log("reset password page",location)
   const handleSubbmit =async(e)=>{
     e.preventDefault()
     if(data.newPassword!==data.confirmPassword){
      toast.error("password donot match")
      return
     }
    try
    {
const response =await Axios({
    ...SummaryApi.resetPassword,
       data:data
    })
    if(response.data.error ){
        toast.error(response.data.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
         navigate("/login",{
            state:data
        })
        setData({
            email:"",
    newPassword:"",
    confirmPassword:""
        })
       
    }
    console.log("response",response) 
    }catch(error){
    AxiosToastError(error)
    }
    
    }
    
  return (
    <section className='  w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 '>
      <p className='font-semibold'>
        Reset password:
        </p>  
        <form action="" className='grid gap-4 py-4 ' onSubmit={handleSubbmit}>      
                <div className='grid gap-1'>
                                <label htmlFor="password">Password :</label>
                                
                                <div className='bg-green-50 p-2 border-[0.3vh] rounded  flex items-center focus-within:border-yellow-200   gap-3'>     
                                <input 
                                type={showPassword?"text":"password"}
                                id='password'
                                name='newPassword'
                                className='w-full bg-white outline-none '
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter New Password'
                                />
                               
                               
                                <div onClick={()=>setShowPassword(preve=>!preve)} className='cursor-pointer'>
                                    {
                                        showPassword?(<FaEye />
                ):(<FaEyeSlash />)
                                    }
                                 
                                </div>
                                </div>
                            
                </div>

                <div className='grid gap-1'>
                                <label htmlFor="confirmPassword">Confirm Password :</label>
                                
                                <div className='bg-green-50 p-2 border-[0.3vh] rounded  flex items-center focus-within:border-yellow-200   gap-3'>     
                                <input 
                                type={showconfirmPassword?"text":"password"}
                                id='confirmPassword'
                                name='confirmPassword'
                                className='w-full bg-white outline-none '
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='confirm New Password'
                                />
                               
                               
                                <div onClick={()=>setShowConfirmPassword(preve=>!preve)} className='cursor-pointer'>
                                    {
                                        showconfirmPassword?(<FaEye />
                ):(<FaEyeSlash />)
                                    }
                                 
                                </div>
                                </div>
                            
                            </div>
            
            
             
            <button className= "bg-green-800  hover:bg-green-600 hover py-2 rounded font-semibold my-3 tracking-tight text-md text-white transition-colors duration-200 active:scale-95">
               Reset Password
            </button>
        </form>
        <p>
            Go to   <Link className=' active:scale-95 font-bold text-green-600 hover:text-green-800' to={"/register"}>
            Login
            </Link>
        </p>
      </div>
    </section>
  )
}

export default ResetPassword
