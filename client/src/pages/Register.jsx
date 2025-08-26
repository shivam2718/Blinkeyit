import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom'
const Register = () => {
    const [data, setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const handleSubbmit =async(e)=>{
     e.preventDefault()
     if(data.password!==data.confirmPassword){
      toast.error("password and confirm password are different!!!")
         return
     }
    try
    {
const response =await Axios({
    ...SummaryApi.register,
       data:data
    })
    if(response.data.error ){
        toast.error(response.data.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
        setData({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        })
        navigate("/login")
    }
    console.log("response",response) 
    }catch(error){
    AxiosToastError(error)
    }
    
    }
    const handleChange=(e)=>{
     const {name,value}=e.target
     setData((preve)=>{
     return{
        ...preve,
        [name]:value
     }
     })
    }
    const validValue=Object.values(data).every(el=>el)
    console.log("data",data)

  return (
    <section className='  w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 '>
      <p className='font-semibold'>
        Welcome!! to Blinkeyit 
        </p>  
        <form action="" className='grid gap-4 mt-6' onSubmit={handleSubbmit}>
            <div className='grid'>
                <label htmlFor="name">Name :</label>
                <input 
                type="text"
                autoFocus
                id='name'
                name='name'
                className='bg-green-50 p-2 border-[0.3vh] rounded outline-none focus:border-yellow-200 '
                placeholder='Enter Name'
                value={data.name}
                onChange={handleChange}

                />
            </div>
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
            <div className='grid gap-1'>
                <label htmlFor="password">Password :</label>
                
                <div className='bg-green-50 p-2 border-[0.3vh] rounded  flex items-center focus-within:border-yellow-200   gap-3'>     
                <input 
                type={showPassword?"text":"password"}
                id='password'
                name='password'
                className='w-full bg-white outline-none '
                value={data.password}
                onChange={handleChange}
                placeholder='Enter Password'
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
                type={showConfirmPassword?"text":"password"}
                id='confirmPassword'
                name='confirmPassword'
                className='w-full bg-white outline-none '
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter Password Again'
                />
               
               
                <div onClick={()=>setShowConfirmPassword(preve=>!preve)} className='cursor-pointer'>
                    {
                        showConfirmPassword?(<FaEye />
):(<FaEyeSlash />)
                    }
                 
                </div>
                </div>

            </div>
            <button className={`${validValue ? "bg-green-800  hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"} py-2 rounded font-semibold my-3 tracking-tight text-md text-white transition-colors duration-200`}>
                Register
            </button>
        </form>
        <p>
            Aready have an account ?  <Link className='font-bold text-green-600 hover:text-green-800' to={"/login"}>
            Login
            </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
