import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/axiosToastError';
import { useNavigate, Link } from 'react-router-dom'
const ForgotPassword = () => {
    const [data, setData]=useState({
        email:"",
    })
    const navigate = useNavigate()
     
    const handleChange=(e)=>{
     const {name,value}=e.target
     setData((preve)=>{
     return{
        ...preve,
        [name]:value
     }
     })
    }

    const handleSubbmit =async(e)=>{
     e.preventDefault()
    try
    {
const response =await Axios({
    ...SummaryApi.forgot_password,
       data:data
    })
    if(response.data.error ){
        toast.error(response.data.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
         navigate("/verify-forgot-password-otp",{
            state:data
        })
        setData({
            email:"",
        })
       
    }
    console.log("response",response) 
    }catch(error){
    AxiosToastError(error)
    }
    
    }
     
    const validValue=Object.values(data).every(el=>el)
    console.log("data",data)

  return (
    <section className='  w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 '>
      <p className='font-semibold'>
        Forgot Password
        </p>  
        <form action="" className='grid gap-4 py-4 ' onSubmit={handleSubbmit}>
            
            <div className='grid'>
                <label htmlFor="email">Email :</label>
                <input 
                type="email"
                id='email'
                name='email'
                className='bg-green-50 p-2 border-[0.3vh]  rounded focus-within:border-yellow-200 outline-none '
                value={data.email}
                onChange={handleChange}
                placeholder='Enter Email'

                />
            </div>
            
             
            <button className={`${validValue ? "bg-green-800  hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"} py-2 rounded font-semibold my-3 tracking-tight text-md text-white transition-colors duration-200`}>
                Send OTP
            </button>
        </form>
        <p>
            Go to   <Link className='font-bold text-green-600 hover:text-green-800' to={"/register"}>
            Login
            </Link>
        </p>
      </div>
    </section>
  )
}

export default ForgotPassword
