import React from 'react'
import UsersMenu from '../components/UsersMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Dashboard = () => {
    const user =useSelector(state=>state.user)
   
return (
    <section className='bg-white '>
        <div className='container mx-auto p-3'>
            <div className='flex  w-full'>
            <div className='w-[250px] sticky top-24 overflow-y-auto hidden lg:block border-r mr-2 max-h-[calc(100vh-96px)]'>
                {/*left part for menu */}
                <UsersMenu/>
            </div>
            <div className=' flex-1 min-h-[76vh]'>
                {/*right part for content */}
             <Outlet/>
            </div>
            </div>
        </div>
    </section>
)
}

export default Dashboard
