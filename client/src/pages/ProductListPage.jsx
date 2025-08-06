import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import Axios from '../utils/axios'
import SummaryApi from '../common/SummaryApi'
import {Link} from "react-router-dom"
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const [totalPage,setTotalpage ]= useState(1)
  const params=useParams()
  const AllSubcategory=useSelector(state=>state.product.allSubCategory)
  const [DisplaySubCategory,setDisplaySubCategory] = useState ([])
const subCategory= params?.subcategory?.split("-")
const subCategoryName= subCategory?.slice(0,subCategory?.length-1)?.join(" ")
  const categoryId=params.category.split("-").slice(-1)[0]
  const subCategoryId =params.subcategory.split("-").slice(-1)[0]
  const fetchProductData=async()=>{
  


  
  try {
      setLoading(true)
      const response =await Axios({
        ...SummaryApi.getProductByCategoryAndSubcategory,
        data:{
          categoryId:categoryId,
         subCategoryId:subCategoryId,
          page : page,
          limit :10,
        }
      })

      const {data:responseData}=response 
      if(responseData.success){
       //console.log(responseData)
       if(responseData.page==1){
       setData(responseData.data)
      } else {
        setData([...data,responseData.data])
      }
      }
    }catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchProductData()
  },[params])

useEffect(()=>{
    const sub =AllSubcategory.filter(s=>{
      const filterData =s.category.some(el=>{
        return el._id===categoryId
      })
    return filterData?true:false
    })
    setDisplaySubCategory(sub)
  },[params,AllSubcategory])

  return (
    <section className='sticky top-24
     lg:top-20
    '>
     <div
  className="
    grid  
    [grid-template-columns:90px_1fr]
    md:[grid-template-columns:200px_2fr]
    lg:[grid-template-columns:280px_3fr]
  "
>

      {/*sub category */}
<div className='min-h-[80vh] max-h-[80vh] overflow-y-scroll scrollbarCustom p-2 space-y-2 bg-white'>
  {DisplaySubCategory.map((s, index) => {
    
    const link =`/${s.category[0]?.name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${s.category[0]?._id}/${s?.name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${s?._id}`
  return(
    <Link
     to={link}
      key={index}
      className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2 border-b border-gray-200 hover:bg-green-200 rounded cursor-pointer transition 
        ${subCategoryId=== s._id ?"bg-green-400 hover:bg-green-400":"" }`}
    >
      {/* Image */}
      <div className='
        w-12 h-12 
        sm:w-14 sm:h-14 
        md:w-16 md:h-16 
        flex items-center justify-center bg-white shadow rounded
      '>
        <img
          src={s.image}
          alt='subcategory'
          className='w-3/4 h-3/4 object-contain'
        />
      </div>

      {/* Name */}
      <p className='
        text-center sm:text-left
        text-xs 
        sm:text-sm 
        md:text-base 
        font-medium 
        text-gray-800
      '>
        {s.name}
      </p>
    </Link>
  )})}
</div>




      {/*product */}
      <div className='' >
<div className=''>
  <div className='bg-white shadow-md p-4'>
<h3 className='font-semibold'>
  {subCategoryName}
</h3>
  </div>
  <div>
  
    <div className='grid grid-cols-1 md:grid-cols-3 p-4 gap-4 lg:grid-cols-4 '>

    {
      data.map((p,index)=>{
        return( 
        <CardProduct
         data={p}
         key={p._id+"productSubcategory"+index}
        />
      )
      })
    }
  </div>
  
    {
      loading && (<Loading/>)
    }
  </div>
</div>
      </div>
    </div>
    </section>
    
  )
}

export default ProductListPage
