import { Link,useNavigate } from 'react-router-dom'
import { FaAngleLeft ,FaAngleRight} from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {useSelector} from 'react-redux'
import SummaryApi from '../common/SummaryApi';
import CardProduct from './CardProduct.jsx';
import Axios from '../utils/axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import CardLoading from './CardLoading.jsx';
const CategoryWiseProductDisplay = ({id,name}) => {
    const [data ,setData] = useState([]);
    const [loading, setLoading] = useState(false);
     const navigate = useNavigate()
  const subCategoryData = useSelector(state => state.product.allSubCategory)
   const loadingCardNumber=new Array(7).fill(null)
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true);
            const response =await Axios({
           ...SummaryApi.getProductByCategory,
                data: {
                    
                    id:[id]
                
                }
            })
            const {data:responseData}=response
           // console.log(responseData)
            if(responseData.success){
                setData(responseData.data)
            }
        } catch (error) {
            console.error("Error fetching category wise product:", error);
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }
    const containerRef =useRef()
    useEffect(() => {
        fetchCategoryWiseProduct();
    }, []);
   const handleScrollRight = () => {
  if (containerRef.current) {
    containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  }
}
const handleScrollLeft = () => {
  if (containerRef.current) {
    containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  }
};

 const handleRedirectProductListPage = () => {
  console.log(id,name)
  const subcategory=subCategoryData.find(sub=>{
const filterData=sub.category.some(c=>{
return c._id===id
}) 
 return filterData?true:null
})
const url =`/${name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${id}/${subcategory.name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${subcategory._id}`
navigate(url)

}
return (
    <div>
        <div className='container mx-auto my-4 px-4 py-2 flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
            <Link 
            onClick={handleRedirectProductListPage}
            to=""
                className="text-green-600 hover:text-green-700 font-semibold"
            >See All</Link>
        </div>
        <div
  className="flex gap-4 items-center lg:gap-8 md:gap-6  mx-auto overflow-x-auto scrollbar-hide "
  ref={containerRef}
>

            {
                loading && loadingCardNumber.map((loading, index) => (
                    <CardLoading key={"123" + "categoryWiseProductDisplay" + index} />
                ))
            }
           <div className="w-full left-0 right-0 container mx-auto gap-6 flex justify-between 
           ">

          
            {
                data.map((p, index) => (
                    <CardProduct
                        data={p}
                        key={p._id + "categoryWiseProductDisplay" + index} />
                ))
            }
             </div>
            <div className="w-full left-0 right-0 container mx-auto absolute hidden lg:flex justify-between 
           ">
<button
onClick={handleScrollLeft}
className="z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100" >
    <FaAngleLeft />
</button>
<button 
onClick={handleScrollRight}
className="z-10 relative text-lg bg-white shadow-lg p-2 rounded-full hover:bg-gray-100" >
    <FaAngleRight />
</button>
            </div>
        </div>
       
    </div>
);
};

export default CategoryWiseProductDisplay;
