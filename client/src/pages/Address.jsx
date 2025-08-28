import React from 'react'
import {useSelector} from 'react-redux' 
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Address = () => {

  const addressList = useSelector(state=>state.addresses.addressList)
  const [openAddress,setOpenAddress]=React.useState(false)
  const [openEdit,setOpenEdit]=React.useState(false)
  const [editData,setEditData]=React.useState({})
  return (
    <div className='bg-green-50'>
   <div className='flex bg-white shadow  px-2 py-2 text-lg font-semibold mb-2 justify-between '>   
    <h2 className='' >
     Address
    </h2>
   <button className='font-light text-sm border px-4 py-2 rounded-full bg-green-400 hover:bg-green-600 text-white border-gray-700'
   onClick={()=>setOpenAddress(true)}
   >
    Add Address
   </button>
   </div>
     {
  addressList.map((address, index) => 
    
    {
      return (
       

   
   <div key={index } onChange={(e)=>{
       setSelectAddress(e.target.value)
   }} className=' p-4 mb-2 rounded flex flex-center gap-4 hover:border-1 hover:border-purple-400 hover:text-purple-600 bg-white mt-4 border-t-1 border-l-1 '>
    <div>

      </div>
      
      <div className='w-full'>
         <p>{address.address_line}</p>
      <p>{address.city},{address.state}</p>
      <p>  {address.country}-{address.pincode} </p>
       <p>{address.mobile}</p> 
        </div>
        <div className='flex  justify-around gap-5'>
           
            
           <button>
           <MdDelete  size={30} className='text-red-500 cursor-pointer hover:text-red-700'/>
           </button>
            <button>
           <MdEdit  size={30} className='text-blue-500 cursor-pointer hover:text-blue-700'/></button>
        </div>
        </div>
   
  )})
}
{
  openAddress&&(
    <AddAddress close={()=>setOpenAddress(false)}/>
  )
}

    </div>
  )
}

export default Address
 