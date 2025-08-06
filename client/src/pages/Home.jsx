import React from 'react'
import banner from '../assets/banner.jpg'
import { useState } from 'react'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
const Home = () => {
  const  loadingCategory = useSelector(state=>state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const navigate = useNavigate()
  const subCategoryData = useSelector(state => state.product.allSubCategory)
 const handleRedirectProductListPage = (id,cat) => {

  const subcategory=subCategoryData.find(sub=>{
const filterData=sub.category.some(c=>{
return c._id===id
}) 
 return filterData?true:null
})
const url =`/${cat.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${id}/${subcategory.name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}-${subcategory._id}`
navigate(url)

}

  return (
    <section className=" bg-white">
      <div className='min-h-48  container mx-auto  my-4   '>
        <div className={`w-full h-full bg-white min-h-48 rounded  ${!banner&&"animate-pulse my-2"} `}>
          <img 
          src={banner}
          alt="Banner" 
          className='w-full h-full object-cover rounded hidden lg:block'
           />
            <img 
          src={bannerMobile}
          alt="Banner" 
          className='w-full h-full object-cover rounded  lg:hidden'
           />
        </div>
      </div>
      <div className='container mx-auto my-2 px-4  grid grid-cols-4 md:grid-cols-8
      lg:grid-cols-10  gap-2'>
   {
    loadingCategory?(new Array(12).fill(null).map((c,index)=>{
      return (
        <div key={index+"loadingcategory"} className="bg-white rounded  min-h-36 grid  gap-2 p-4 shadow-sm animate-pulse">
          <div className="bg-blue-100 rounded  min-h-28"></div>
          <div className="bg-blue-100 rounded h-14"></div>
        </div>
      );
    })):(
     categoryData.map((cat,index)=>{
      return (
        <div onClick={()=>handleRedirectProductListPage(cat._id,cat.name)} key={cat._id+"displaycategory"} className="bg-white rounded  min-h-36 grid  gap-2 p-4 shadow-sm cursor-pointer">
          <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover rounded"
          />

        </div>
      )
     })
    )
    
   }
      </div>
      {/* display category product  */}
      {
        categoryData.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay id={c._id} key={c._id+"categorywise"} name={c.name}/>

          )
        })
      }
    </section>
  )
}

export default Home
