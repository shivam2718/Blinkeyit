import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className='border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-16'>
        <div className='container mx-auto p-6 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
       <p className='text-gray-600 font-medium'>© All Rights reserved 2025.</p>
        
         <div className='flex items-center gap-6 justify-center text-2xl'>
            <a href="" className='text-gray-600 hover:text-emerald-500 hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-emerald-50'>
             <FaFacebook />
            </a>
            <a href="" className='text-gray-600 hover:text-emerald-500 hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-emerald-50'>
                <FaInstagram />
            </a>
            <a href="" className='text-gray-600 hover:text-emerald-500 hover:scale-110 transition-all duration-200 p-2 rounded-full hover:bg-emerald-50'>
                <FaLinkedin />
            </a>
         </div>
         </div>
      </footer>
    </div>
  )
}

export default Footer
