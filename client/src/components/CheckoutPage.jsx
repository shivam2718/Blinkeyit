
import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

import { useState } from 'react'
import { handleAddAddress } from '../store/addressSlice' // Add this import
import { useSelector, useDispatch } from 'react-redux' // Add useDispatch
import Axios from '../utils/Axios'
import { toast } from 'react-hot-toast';
import AddAddress from '../components/AddAddress'
import { useGlobalContext } from '../provider/GlobalProvider';
import {loadStripe} from '@stripe/stripe-js'
import {useNavigate} from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
const CheckoutPage = () => {
  const dispatch = useDispatch() 
  const navigate=useNavigate()
    const { notDiscountTotalPrice, totalPrice, totalQty,fetchCartItem } = useGlobalContext()

    const [openAddress,setOpenAddress] = React.useState(false)
   const addressList = useSelector(state => state.addresses.addressList)
   const [selectAddress,setSelectAddress] = React.useState(0)
   const cartItemsList=useSelector(state => state.cartItem.cart)

   console.log(totalPrice+40+5)
 const handleCashOnDelivery = async() => {
      try {
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice+40+5,
            }
          })

          const { data : responseData } = response

          if(responseData?.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              navigate('/success')
            
          }

      } catch(error){
         toast.error('Payment failed')
    }
   }

   const handleOnlinePayment=async()=>{
  try{
    const stripePublicKey=import.meta.env.VITE_STRIPE_PUBLIC_KEY
    const stripePromise=await loadStripe(stripePublicKey)
  const response =await Axios({
    ...SummaryApi.payment_url,
     data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice+40+5,
            }
  })
  const { data : responseData } = response

  if(responseData?.success){
     stripePromise.redirectToCheckout({ sessionId: responseData.sessionId })
      navigate('/success')

  }

  }catch(error){

  }
   }
  return (
   <section className='bg-white '>
    <div className='container mx-auto  p-4 flex w-full gap-5 justify-between lg:flex-row flex-col'>
       <div className='w-full lg:flex-1'>
        {/*address */}
        <h3 className='text-lg font-semibold'>
          Choose Your Address
        </h3>
{
  addressList.map((address, index) => 
    
    {
      return (
        <label htmlFor={`address-${index}`}
        className={`${address.status ? '' : 'hidden'}`}
        >

   
   <div key={index } onChange={(e)=>{
       setSelectAddress(e.target.value)
   }} className='border p-4 mb-2 rounded flex flex-center gap-4 hover:bg-amber-100  '>
    <div>
      <input
      type='radio'
      name='address'
      value={index}
      id={`address-${index}`}
      
      />
      </div>
      <div>
         <p>{address.address_line}</p>
      <p>{address.city},{address.state}</p>
      <p>  {address.country}-{address.pincode} </p>
       <p>{address.mobile}</p> 
        </div>
    </div>     </label>
  )})
}

        
        <div className='h-16 bg-green-50 border-2 border-dashed border-green-700 flex items-center justify-center mt-2 cursor-pointer'
        onClick={() => setOpenAddress(true)}
        >
          Add Address
        </div>

       </div>
       <div className='w-full max-w-md lg:flex-1 bg-white py-4 px-2'>
        {/*summary */}
        <h3 className='text-lg font-semibold mt-4'>
          Order Summary
        </h3>
        <div className='bg-white p-4'>
            <h3 className='text-lg font-semibold'>Bill details</h3>
             <div className='flex items-center justify-between mt-2 ml-1'>
               <p>
                 Items 
               </p>
               <p className='flex items-center gap-2'>
                {totalQty}
               </p>
            </div>
            <div className='flex items-center justify-between mt-2 ml-1'>
               <p>
                Total Amount 
               </p>
               <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span> <span>
                {DisplayPriceInRupees(totalPrice)}
                </span></p>
            </div>
             <div className='flex items-center justify-between mt-2 ml-1'>
               <p>
                 Delivery Charges
               </p>
               <p className='flex items-center gap-2'>
                 {DisplayPriceInRupees(40)}
               </p>
            </div>
            <div className='flex items-center justify-between mt-2 ml-1'>
               <p>
                Platform Fee
               </p>
               <p className='flex items-center gap-2'>
                 {DisplayPriceInRupees(5)}
               </p>
            </div>
            <div className='flex items-center justify-between mt-2 ml-1 *:font-semibold border-t-2 pt-2'>
               <p>
               Grand Total
               </p>
               <p className='flex items-center gap-2  font-semibold'>
                 {DisplayPriceInRupees(totalPrice + 40 + 5 )}
               </p>
            </div>
            
        
           </div>
       <div className='w-full max-w-sm flex flex-col gap-4 mt-4 mb-4'>
          <button className='py-2 px-4 bg-green-500 text-white font-semibold hover:bg-green-700  border-2 rounded border-emerald-900'
          onClick={handleOnlinePayment}
          >
         Online Payment
         </button>
         <button className='py-2 px-4 font-semibold hover:bg-green-700 hover:text-white border-2 rounded border-emerald-900 text-green-500'
         onClick={handleCashOnDelivery}
         >
          Cash on Delivery
         </button>
       </div>

       </div>
    </div>
   {
    openAddress&&(
      <AddAddress close={() => {
        setOpenAddress(false)
         console.log('Opening address modal');
      }}/>
    )
   }
   </section>
  )
}

export default CheckoutPage


