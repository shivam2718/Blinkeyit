import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import {Link, useLocation, useNavigate} from 
'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
const search = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const redirectToSearchPage = ()=>{
     navigate("/search")
    }
    const [isSearchPage,setIsSearchpage]=useState(false);
    useEffect(()=>{
     const isSearch = location.pathname==="/search"
     setIsSearchpage(isSearch);                      
    },[location])
    const [isMobile] =useMobile()
    const handleOnChange =(e)=>{
       const value =e.target.value 
       const url =`/search?q=${value}`
       navigate(url)
    }
return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border p-1 overflow-hidden flex items-center text-neutral-400 bg-slate-50 group focus-within:border-[#ffbf00] '>
        <div>
        {
            (isMobile && isSearchPage) ?(
<Link to={"/"} className='flex justify-center items-center h-full  group-focus-within:text-[#ffbf00] bg-white rounded-full shadow-md p-2 m-1'>
    <FaArrowLeftLong />
        </Link>
            ):(
<button className='flex justify-center items-center h-full p-3 group-focus-within:text-[#ffbf00]'>
            <IoIosSearch size={22} />
        </button>
            )
        }
         
        </div>
        <div className='w-full h-full flex-1'>
            {isSearchPage ? (
                // In search page
                <div className='w-full h-full'>
                    <input 
                        type="text" 
                        placeholder='search for atta dal'
                        className='bg-transparent w-full h-full outline-none'
                        autoFocus={true}
                        onChange={handleOnChange}
                    />
                </div>
            ) : (
                // Not in search page
                <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                    <TypeAnimation
                        sequence={[
                            'search "milk"',
                            1000,
                            'search "bread"',
                            1000,
                            'search "sugar"',
                            1000,
                            'search "panner"',
                            1000,
                            'search "rice"',
                            1000,
                            'search "vegetables"',
                            1000,
                            'search "fruits"',
                            1000,
                            'search "chocolate"',
                            1000,
                            'search "coffee"',
                            1000,
                            'search "tea"',
                            1000,
                            'search "juice"',
                            1000,
                            'search "water"',
                            1000,
                            'search "snacks"',
                            1000,
                            'search "spices"',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </div>
            )}
        </div>
    </div>
)
}

export default search
