import React from 'react'
import UsersMenu from '../components/UsersMenu'
import { AiFillCaretLeft } from "react-icons/ai";const UserMenuMobile = () => {
  return (
   <section className='bg-white w-full h-full py-2'>
    <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
    < AiFillCaretLeft    size={25}/>
    </button>
    <div className='container mx-auto px-3 pb-8'>
    <UsersMenu/>
    </div>
    </section>
  )
}

export default UserMenuMobile
