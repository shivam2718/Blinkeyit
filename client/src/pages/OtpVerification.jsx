import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link, useLocation } from 'react-router-dom'
const OtpVerification = () => {
    const [data, setData]=useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef =useRef([])
     const validValue=data.every(el=>el)
    console.log("data",data)
    const location =useLocation()
    useEffect(()=>{
        if(!location?.state?.email){
            navigate('/forgot-password')
        }
    },[])
    console.log("location",location)
    const handleSubbmit =async(e)=>{
     e.preventDefault()
    try
    {
const response =await Axios({
    ...SummaryApi.forgot_password_otp_verification,
       data:{
       otp:data.join("") ,
        email: location?.state?.email
       }
    })
    if(response.data.error ){
        toast.error(response?.data?.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
        setData(["","","","","",""])
       navigate("/reset-password",{
        state:{
            data:response.data,
             email: location?.state?.email
        }
       })
    }
    console.log("response",response) 
    }catch(error){

    AxiosToastError(error)
    }
    
    }
     
   

  return (
    <section className="  w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className="font-semibold">Enter OTP:</p>
        <form action="" className="grid gap-4 py-4 " onSubmit={handleSubbmit}>
          <div className="grid">
            <label htmlFor="otp">OTP :</label>
            <div className='flex items-center gap-2 justify-between  mt-3'>
              {data.map((element, index) => {
                return (
                  <input
                    key={index+"otp"}
                    type="text"
                    id="otp"
                    ref={(ref)=>{
                       inputRef.current[index]=ref 
                       return ref
                    }}
                    value={data[index]}
                    onChange={(e)=>{
                        const value=e.target.value
                        console.log("value",value)
                        const newData=[...data]
                        newData[index]=value
                        setData(newData)

                        if(value && index<5){
                            inputRef.current[index+1].focus()
                        }
                    }}
                    maxLength={1}
                    className="bg-green-50 p-2 border-[0.3vh]  rounded focus-within:border-yellow-200 outline-none w-full max-w-14 text-center font-semibold
                    "
                  />
                );
              })}
            </div>
          </div>

          <button
            className={`${
              validValue
                ? "bg-green-800  hover:bg-green-600"
                : "bg-gray-400 hover:bg-gray-500"
            } py-2 rounded font-semibold my-3 tracking-tight text-md text-white transition-colors duration-200 active:scale-95`}
          >
            verify OTP
          </button>
        </form>
        <p>
          Go to{" "}
          <Link
            className="active:scale-95 font-bold text-green-600 hover:text-green-800 "
            to={"/register"}
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default OtpVerification
