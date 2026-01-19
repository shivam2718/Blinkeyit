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
    <section className="bg-gradient-to-br from-white via-emerald-50 to-green-50 min-h-screen">
      <div className='min-h-48 container mx-auto my-6'>
        <div className={`w-full h-full bg-gradient-to-r from-emerald-100 to-green-100 min-h-48 rounded-2xl shadow-xl overflow-hidden ${!banner&&"animate-pulse my-2"} `}>
          <img 
          src={banner}
          alt="Banner" 
          className='w-full h-full object-cover rounded-2xl hidden lg:block hover:scale-105 transition-transform duration-500'
           />
            <img 
          src={bannerMobile}
          alt="Banner" 
          className='w-full h-full object-cover rounded-2xl lg:hidden hover:scale-105 transition-transform duration-500'
           />
        </div>
      </div>
      <div className='container mx-auto my-8 px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4'>
   {
    loadingCategory?(new Array(12).fill(null).map((c,index)=>{
      return (
        <div key={index+"loadingcategory"} className="bg-white rounded-2xl min-h-36 grid gap-2 p-4 shadow-lg animate-pulse border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl min-h-28"></div>
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg h-14"></div>
        </div>
      );
    })):(
     categoryData.map((cat,index)=>{
      return (
        <div onClick={()=>handleRedirectProductListPage(cat._id,cat.name)} key={cat._id+"displaycategory"} className="bg-white rounded-2xl min-h-36 grid gap-2 p-4 shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 group">
          <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
          />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors duration-200">{cat.name}</p>
          </div>
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
