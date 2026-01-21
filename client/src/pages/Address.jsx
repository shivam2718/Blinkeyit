import React from 'react'
import {useSelector} from 'react-redux' 
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { toast } from 'react-hot-toast';
import AxiosToastError from '../utils/axiosToastError'
import Axios from '../utils/axios';
import SummaryApi from '../common/SummaryApi'
import EditAddress from '../pages/EditAddress'
import {useGlobalContext} from '../provider/GlobalProvider'
const Address = () => {

  const addressList = useSelector(state=>state.addresses.addressList)
  const [openAddress,setOpenAddress]=React.useState(false)
  const [openEdit,setOpenEdit]=React.useState(false)
  const [editData,setEditData]=React.useState({})
  const {fetchAddress} = useGlobalContext()
  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: id
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchAddress()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
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
       

   
   <div key={index } 
   className={` p-4 mb-2 rounded flex flex-center gap-4 hover:border-1 hover:border-purple-400 hover:text-purple-600 bg-white mt-4 border-t border-l  ${!address.status && 'hidden'}`}>
    
      
      <div className='w-full'>
         <p>{address.address_line}</p>
      <p>{address.city},{address.state}</p>
      <p>  {address.country}-{address.pincode} </p>
       <p>{address.mobile}</p> 
        </div>
        <div className='flex  justify-around gap-5'>
           
            
           <button>
           <MdDelete  size={30} 
           onClick={() => handleDisableAddress(address._id)}
           className='text-red-500 cursor-pointer hover:text-red-700'/>
           </button>
            <button>
           <MdEdit  size={30} className='text-blue-500 cursor-pointer hover:text-blue-700'
           onClick={()=>{
               setOpenEdit(true)
               setEditData(address)
           }}
           /></button>
        </div>
        </div>
   
  )})
}
{
  openAddress&&(
    <AddAddress close={()=>setOpenAddress(false)}/>
  )
}

{
  openEdit && (
    <EditAddress close={() => setOpenEdit(false)} data={editData} />
  )
}
    </div>
  )
}

export default Address
 