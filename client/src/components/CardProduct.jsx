import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { priceWithDiscount } from "../utils/priceWithDiscount";
import SummaryApi from "../common/SummaryApi";
import { useGlobalContext } from "../provider/GlobalProvider";
import AxiosToastError from '../utils/AxiosToastError.js'
import {useState} from "react"
import Axios from '../utils/axios.js'
import { useDispatch } from 'react-redux';
import { handleAddItemCart } from '../store/cartProduct';

const CardProduct = ({ data }) => {
  const dispatch = useDispatch();
  const url = `/product/${data.name
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-")}-${data._id}`;
    const [loading,setLoading]=useState(false)
 const {fetchCartitem,updateCartItemQty}=useGlobalContext()



const handleADDTocart = async(e) => {
  e.preventDefault()
  e.stopPropagation()

  try {
    const response = await Axios({
      ...SummaryApi.addToCart,
      data: {
        productId: data?._id
      }
    });
    
    if(response.data.success) {
      // Dispatch to Redux
      dispatch(handleAddItemCart({
        ...data,
        quantity: 1
      }));
      toast.success(response.data.message);
    }
  } catch(error) {
    AxiosToastError(error);
  }
}

const increaseQty = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  
}
  return (
    <Link
  to={url}
  className="border border-slate-200 p-2 grid gap-1 rounded w-full max-w-[10rem] sm:max-w-[12rem] lg:max-w-[13rem] cursor-pointer"
>

      {/* Image */}
      <div className="w-full h-24 sm:h-28 lg:h-36 flex items-center justify-center overflow-hidden rounded bg-white">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Time badge */}
      <div className="text-[10px] sm:text-xs w-fit px-2 py-0.5 rounded text-green-600 bg-green-100">
        10 min
      </div>

      {/* Product name */}
      <div className="text-sm font-medium line-clamp-2 leading-snug">
        {data.name}
      </div>

      {/* Unit */}
      <div className="py-0.5 px-2 w-fit rounded text-slate-500 text-[10px] sm:text-xs bg-slate-100">
        {data.unit}
      </div>

      {/* Price + Add to Cart */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold flex items-center text-slate-700">
          <p className="text-green-600 mr-1">
            {data.discount}% OFF
          </p>
         
          <MdCurrencyRupee className="text-base" />
          {priceWithDiscount(data.price,data.discount)+".00"}

        </div>
        
{
  data.stock===0 ? (
    <p className='text-xs text-red-500 ml-1 leading-tight'>Stock out !</p>
  ):(
        <button className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded hover:bg-green-700 ml-2"
        onClick={handleADDTocart}
        >
          Add
        </button> )
}
      </div>
    </Link>
  )
};

export default CardProduct;
