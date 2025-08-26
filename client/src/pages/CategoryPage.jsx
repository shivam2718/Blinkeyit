import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/confirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Category = ({fetchData}) => {
  const [openUploadCategory,setOPenUploadCategory]=useState(false)
  const [loading,setloading]=useState(true)
  const [categoryData,setCategoryData]=useState([])
  const [editData,setEditData]=useState({
    name:"",
    image:""
  })
  
  const [openConfirmBox,setOpenConfirmBox]=useState(false)
  const [openEdit,setOpenEdit]=useState(false)
  const [deleteCategory,setDeleteCategory]=useState({
    _id:""
  })
  const allCategory=useSelector(state=>state.product.allCategory)
  useEffect(()=>{
  setCategoryData(allCategory)
  },[allCategory])
  const fetchCategory = async()=>{
    try {
      setloading(true)
      const response =await Axios({
    ...SummaryApi.getCategory,
    params: { t: Date.now() } 
      })
      const {data:responseData}=response
      if(responseData.success){
        setCategoryData(responseData.data)

      }
      console.log(responseData)
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setloading(false)
    }
  } 
  
 useEffect(() => {
  fetchCategory();
}, []); 
{/*
const handleDeleteCeategory =async()=>{
 try {
  const response = await Axios({
   ...SummaryApi.deleteCategory,
   data : deleteCategory
  })
  const {data:responseData}=response.data

  if(responseData.success){
    toast.success(responseData.message)
    console.log("response",response)
    fetchCategory()
    setOpenConfirmBox(false)
  }
 } catch (error) {
  AxiosToastError(error)
   setOpenConfirmBox(false);
 }
}*/}
const handleDeleteCeategory = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.deleteCategory,
      data: deleteCategory
    });

    const responseData = response.data; // ✅ fixed

     // ✅ now it will log

    if (responseData.success) {
console.log("response", responseData.success);
      toast.success(responseData.message);
    
      fetchCategory(); // ✅ now this will be called

      setOpenConfirmBox(false);
    } else {
      toast.error(responseData.message || "Delete failed.");
    }
  } catch (error) {
    AxiosToastError(error);
    setOpenConfirmBox(false);
  }
};


  return (
    <section>
      <div className='p-2  bg-white shadow-md flex item-center justify-between'>
      <h2 className='font-semibold'>Category</h2>
      <button onClick={()=>{setOPenUploadCategory(true)}} className='active:scale-95 text-sm border font-semibold border-yellow-400 hover:bg-yellow-300 rounded-full px-2 py-2'>Add Category</button>
      </div>

     {
  categoryData.length === 0 && !loading && (
    <p className='font-semibold'>
      <NoData/>
    </p>
  )
}
      <div className='p-4 grid md:grid-cols-4 grid-cols-2 lg:grid-cols-6 gap-3'>
        {
        categoryData.map((category)=>{
            return (
            <div 
            key={category._id}  
            className='w-32 h-56 rounded shadow-md group'>

              <img
              alt={category.name}
              src={category.image}
              className='w-full object-scale-down'
              />
              <div className='flex items-center justify-center h-10  space-x-2'>
              <button className='flex-1 group-hover:block bg-yellow-200 rounded px-2 py-1 text-xs hover:bg-amber-300 active:95'
              onClick={()=>{
                setOpenEdit(true)
                setEditData(category)
              }}
              >
              Edit
              </button>
              <button 
              onClick={()=>{
                setOpenConfirmBox(true)
                setDeleteCategory(category)
              }}
              className='flex-1  group-hover:block bg-red-200 rounded px-2 py-1 text-xs hover:bg-amber-600 active:95'>
                Delete
              </button>
              </div>
            </div>
            )
        })
      }
      </div>
      {
        loading &&(
          <Loading/>
        )
      }

      {
        openUploadCategory&&(<UploadCategoryModel fetchData={fetchCategory} close={()=>setOPenUploadCategory(false)}/>)
      }
    {
        openEdit && (
          <EditCategory data={editData} fetchData={fetchCategory} close={()=>setOpenEdit(false)} />
        )
      }
      {
        openConfirmBox && (<ConfirmBox close={()=>setOpenConfirmBox(false)} cancel={()=>setOpenConfirmBox(false)} confirm={handleDeleteCeategory} />)
      }
      
    </section>
  )
}

export default Category
