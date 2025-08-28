import React from 'react'
import { IoClose } from "react-icons/io5";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider';
import { IoMdArrowRoundForward } from "react-icons/io";
//import toast from '../'
import { useSelector } from 'react-redux' 
import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/priceWithDiscount.js'
import { useNavigate } from 'react-router-dom'

import emptyCart from '../assets/empty_cart.webp'   

const DisplayCartItem = ({ close }) => {
  const  navigate = useNavigate();
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)
  const user = useSelector(state => state.user)
  console.log(user);
  const redirectToCheckoutPage = () => {
    if(user?._id){
      navigate('/checkout');
      if(close){
        close();
      }
      return;
    }
    //toast.error("Please log in to proceed to checkout");
  }
  return (
    <section className="bg-neutral-800/70 fixed inset-0 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        {/* Header */}
        <div className="flex items-center p-4 shadow-md justify-between">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        {/* Cart Body */}
        <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-purple-50 p-2 flex flex-col gap-4'>
          
          {/* If cart is empty */}
          {(!cartItem || cartItem.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
  {/* Empty cart image */}
  <img 
    src={emptyCart} 
    alt="Empty Cart" 
    className="object-scale-down mb-6 opacity-90" 
  />

  {/* Heading */}
  <h2 className="text-xl font-bold text-neutral-800 mb-2">
    Your Cart is Empty
  </h2>

  {/* Subtext */}
  <p className="text-neutral-500 mb-6">
    Looks like you haven’t added anything to your cart yet.
  </p>

  {/* CTA Button */}
  <button 
    onClick={close} 
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
  >
    Continue Shopping
  </button>
</div>

          ) : (
            <>
              {/* Total Savings */}
              <div className='flex items-center bg-purple-100 text-purple-600 font-semibold gap-2 p-2 rounded-full px-4 py-2 justify-between '>
                <p>Your Total Savings</p>
                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>

              {/* Items */}
              <div className="bg-white rounded-lg p-4 grid gap-15 overflow-auto scrollbar-hide">
  {cartItem.map((item, index) => (
    <div key={index} className="flex w-full items-center gap-3 border-b pb-3">
      {/* Product Image */}
      <div className="w-20 h-20 bg-red-100 border border-neutral-400 rounded flex-shrink-0">
        <img
          src={item?.productId?.image[0]}
          className="object-scale-down w-full h-full"
          alt={item?.productId?.name}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 min-w-0">
        <p className="truncate whitespace-nowrap overflow-hidden font-medium">
          {item?.productId?.name}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-green-700 font-semibold">
            {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
          </p>
          <p className="text-sm text-neutral-500 line-through">
            {DisplayPriceInRupees(item?.productId?.price)}
          </p>
          <p className="text-sm text-red-600 font-bold">
            {item?.productId?.discount}% OFF
          </p>
        </div>
        <div className="mt-1">
          <AddToCartButton data={item?.productId} />
        </div>
      </div>
    </div>
  ))}
</div>
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
    <div className='flex items-center justify-between mt-2 ml-1'>
       <p>
       Grand Total
       </p>
       <p className='flex items-center gap-2'>
         {DisplayPriceInRupees(totalPrice + 40 + 5 )}
       </p>
    </div>
    

   </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItem && cartItem.length > 0 && (
          <div className='p-2'>
            <div className='bg-green-700 text-neutral-100 p-2 rounded flex items-center gap-4 justify-between py-4 px-4 font-bold '>
              <div>{DisplayPriceInRupees(totalPrice+40+5)}</div>
              
              <button className='flex items-center gap-2' onClick={redirectToCheckoutPage}>
                Proceed
                <span><IoMdArrowRoundForward size={20} /></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DisplayCartItem
