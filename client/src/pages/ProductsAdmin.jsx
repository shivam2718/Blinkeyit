import React from "react";
import { CiSearch } from "react-icons/ci";
import EditProductAdmin from "../components/EditProductAdmin";
import SummaryApi from "../common/SummaryApi";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { useState } from "react";
import Axios from "../utils/axios";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";  
import Loading from "../components/Loading";
const ProductsAdmin = () => {
    const [productData,setProductData] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [totalPageCount,setTotalPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchProductData= async ()=>{
        try {
            setLoading(true);
            const response=await Axios({
              
                ...SummaryApi.getProduct,
                data:{
                   page:page, 
                   limit :10,
                   search:searchTerm
                }
            })
            const {data:responseData}=response
            
            if(responseData.success){
             // console.log("responseData", responseData);
                setProductData(responseData.data);
                setTotalPageCount(responseData.totalNoPage)
            }
        }
        catch (error) {
           AxiosToastError(error);
        }finally{
            setLoading(false);
        }
    }

    const handleNext = () => {
      if(page!==totalPageCount){
        setPage(prev=>prev+1)
      }

    }
    const handlePrev = () => {
      if(page>1){
        setPage(prev=>prev-1)
      }

    }
    const handleOnchange=(e)=>{
      const { value } = e.target;
      setSearchTerm(value);
      setPage(1); 
    }
    useEffect(() => {
      let flag=true
      const interval =setTimeout(() => {
        if(flag){
        fetchProductData();
        flag=false}
      }, 300);
      return ()=>{
        clearTimeout(interval);
      }
    },[searchTerm, page]); // Fetch data when searchTerm or page changes
  
  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Product</h2>
        <div className="relative min-w-24">
          <input
            type="text"
            onChange={handleOnchange}
            value={searchTerm}
            placeholder="Search Product"
            className="border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <CiSearch className="text-gray-500" size={22} />
          </span>
        </div>
      </div>
      {loading && <Loading />}
      <div className="bg-green-50 p-4">
        <div className="min-h-[55h]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
            {productData.map((product, index) => (
              <ProductCardAdmin key={index} data={product} fetchProductData={fetchProductData} />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 rounded shadow transition"
          >
            Prev
          </button>
          <button>
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow transition"
          >
            Next
          </button>
        </div>
      </div>
     
    </section>
  );
}

export default ProductsAdmin;
