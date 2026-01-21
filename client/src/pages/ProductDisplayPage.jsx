import {useParams} from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/axiosToastError'
import { useEffect, useState, useRef} from 'react'
import { PiCurrencyInrBold } from "react-icons/pi";
import Axios from '../utils/axios'
import Divider from '../components/Divider'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import image1 from '../assets/minute_delivery.png' 
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortments.webp'
import AddToCartButton from '../components/AddToCartButton.jsx'
import { pricewithDiscount } from '../utils/priceWithDiscount.js'
const ProductDisplayPage = () => {
    const params = useParams()
    const productId=params.product?.split("-").slice(-1)[0]
   // console.log("productId",productId)
    const [data,setData]=useState({
        name:"",
        image:[]
    })
    const imageContainer = useRef()
    const [image,setImage]=useState(0)
    const [loading,setLoading] = useState(false)
 const   fetchProductDetails=async()=>{
        setLoading(true)
        try {
            const response =await Axios({
                ...SummaryApi.getProductDetails,
                data:{
                    productId:productId
                }
            })
            const {data : responseData}=response
            
            if(responseData.success){
                setData(responseData.data)
              
            }
        } catch (error) {
      
            AxiosToastError(error)
        }
        finally{
            setLoading(false)
        }
    } 
    useEffect(()=>{
fetchProductDetails();
    },[params])
  // console.log("image",image)
 const handleScrollRight = () => {
  imageContainer.current?.scrollBy({ left: 200, behavior: 'smooth' });
};

const handleScrollLeft = () => {
  imageContainer.current?.scrollBy({ left: -200, behavior: 'smooth' });
};

console.log("product data", data)
    return (
      <section className="container mx-auto p-4 h-auto md:h-screen md:grid md:grid-cols-2 md:overflow-hidden">

        <div className="md:h-full overflow-hidden">
            <div
    className="
    shadow-md
        bg-white
        lg:min-h-[65vh] lg:max-h-[65vh]
        md:min-h-[60vh]

        h-full overflow-hidden w-full flex items-center justify-center "
    >
    <img
  src={data.image[image]}
  className="w-auto h-auto max-h-full max-w-full object-contain
  md:aspect-6/3
  "
  alt="product"
/>
    </div>

          <div className="flex items-center justify-center gap-3 my-2">
            {data.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setImage(index)}
                className={`lg:w-5 lg:h-5 w-3 h-3 rounded-full cursor-pointer outline-none 
      ${index === image ? "bg-slate-500" : "bg-slate-300"}`}
              ></div>
            ))}
          </div>
          <div className='grid relative '>
          <div ref={imageContainer} className="z-10 relative flex gap-4 w-full overflow-x-auto  scrollbar-none">
            {data.image.map((img, index) => {
              return (
                <div className="min-h-20 min-w-20 :w-20 h-20 shadow-md" key={img + index}>
                  <img
                    src={img}
                    className="w-full h-full object-scale-down"
                    alt="min-product"
                    onClick={() => setImage(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className='w-full h-full flex justify-between absolute items-center -ml-3'>
            <button className='bg-white relative p-1 rounded-full shadow-lg z-10'
            onClick={handleScrollLeft}
            >
             <FaAngleLeft />
            </button>
            <button className='bg-white relative p-1 rounded-full shadow-lg z-10'
            onClick={handleScrollRight}
            >
                <FaAngleRight />
            </button>
          </div>
          </div>
          
        </div>
       
          <div className="md:overflow-y-auto md:h-full">
        <div className= ' lg:p-7 p-4 text-base lg:text-lg   '>
        <p className='bg-green-300 w-fit px-2 rounded'>10 min</p>
        <h2 className='text-lg font font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>
            {data.unit}
        </p>
        <Divider/>
        <p>Price</p>
        <div className="flex items-center gap-2 flex-wrap">
  {data.discount && (
    <p className="font-bold text-green-400 lg:text-xl">
      {data.discount}%OFF
    </p>
  )}

  <p className='inline-flex items-center text-gray-600 line-through font-bold'>
  <PiCurrencyInrBold className="text-base" />
  {data.price}
</p>

  <p className='flex items-center gap-1 font-semibold text-lg border border-green-500 w-fit text-white rounded px-2 py-1 bg-green-400'>
    <PiCurrencyInrBold />
    {pricewithDiscount(data.price, data.discount) + ".00"}
  </p>
</div>

          
       
{
  data.stock===0 ? (
    <p className='text-lg text-red-500'>Out of Stock</p>
  ):(
<div   className='my-4 px-4 py-1'>
   <AddToCartButton data={data} />  
</div>
  )
}

<Divider/>
<h2 className='font-semibold'>
   Why shop from binkeyit
    </h2>
    <div>
      <div className='flex items-center gap-4 my-4'>
        <img
        src={image1}
        alt='superfast-delivery'
        width={80}
     className='w-20 h-20 '
        />
        <div>
        <div className='font-semibold'>Superfast Delivery</div>
 <p >  Get your order delivered to your doorstep at the earliest from dark stores near you.   </p>
      </div>
      </div>
      <div className='flex items-center gap-4 my-4'>
        <img
        src={image2}
        alt='Best-price-offers'
        width={80}
     className='w-20 h-20 '
        />
        <div>
        <div className='font-semibold'>Best Prices & Offers</div>
 <p >  Best price destination with offers directly from the manufacturers </p>
      </div>
      </div>
      <div className='flex items-center gap-4 my-4'>
        <img
        src={image3}
        alt='Wide Assortment'
        width={80}
     className='w-20 h-20 '
        />
        <div>
        <div className='font-semibold'>Wide Assortment</div>
 <p >  </p>Choose from 5000+ across food personal care,household and other categories
      </div>
      </div> 
    </div>
        </div>
        <div className='my-4 grid gap-3'>
            <div>
              <p className='font-semibold'>
              Description
            </p>
            <p className='text-base'> {data.description}</p>
            </div>
             <div>
              <p className='font-semibold'>
              Unit
            </p>
            <p className='text-base'> {data.unit}</p>
            </div>
            {
              data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                return (
                  
                   <div>
                    <Divider/>
              <p className='font-semibold'>
              {element}
            </p>
            <p className='text-base'> {data.more_details[element]}</p>
            </div>
                )
              })
            }
          </div>
        </div>

      </section>
    );
};

export default ProductDisplayPage;
