import React from 'react'
import { MdModeEdit } from "react-icons/md";

import { MdDelete } from "react-icons/md";

import ConfirmBox from '../components/confirmBox';
import { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/axiosToastError'
import Axios from '../utils/axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect } from 'react'
import DisplayTable from '../components/DisplayTable'
import {createColumnHelper}  from '@tanstack/react-table'
import toast from 'react-hot-toast';
import ViewImage from '../components/ViewImage'
import EditSubCategory from '../components/EditSubCategory';

const Subcategory = () => {
  const [openAddSubCategory,setOpenAddSubCategory]=useState(false)
  const [openEdit,setOpenEdit]=useState(false)
  const [editData,setEditData]=useState({
    _id:""
  })
  const [deleteSubCategory,setDeleteSubCategory]=useState({
    _id:""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox]=useState(false)
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const columnHelper = createColumnHelper()
  const [imageUrl , setImageUrl]=useState("")
 
const fetchSubCategory =async()=>{
  try {
    setLoading(true)
    const response =await Axios({
      ...SummaryApi.getSubcategory
    })
    const {data:responseData}=response
    if(responseData.success){
  setData(responseData.data)
    }
  } catch (error) {
    AxiosToastError(error)
  }finally{
    setLoading(false)
  }
}
useEffect(()=>{
fetchSubCategory()
},[])
 const handleDeleteSubcategory=async()=>{
try {
  const response = await Axios({
    ...SummaryApi.deleteSubCategory,
    data: deleteSubCategory
  })
  const {data:responseData}=response
  if(responseData.success){
    toast.success(responseData.message)
    fetchSubCategory()
    setOpenDeleteConfirmBox(false)
    setDeleteSubCategory({_id:""})
  }
} catch (error) {
   AxiosToastError(error)
    }
  }
const column =[
 
 columnHelper.accessor('name',{
  header:"Name"
 }),
 columnHelper.accessor('image',{
  header:"Image",
  cell:({row})=>{
   // console.log("row",row.original.image)
    return <div className='flex justify-center items-center'><img
     src={row.original.image}
     alt={row.original.image}
     className='w-8 h-8 cursor-pointer'
     onClick={()=>setImageUrl(row.original.image)}
    /></div>
  }
 }),
 columnHelper.accessor('category',{
  header:"Category",
  cell:({row})=>{
   return (
    <>
    {row.original.category.map((c,index)=>{
  return (
    <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
  )
    })}
    </>
   )
  }
 }),
 columnHelper.accessor("_id",{
  header:"Action",
  cell:({row})=>{
    return(
      <div className='flex items-center justify-center gap-3'>
        <button className='p-2 bg-green-400 hover:text-white rounded-full'
        onClick={()=>{setOpenEdit(true),
          setEditData(row.original)}  
        }
        
        ><MdModeEdit size={20} />
</button>
        <button 
        className='p-2  bg-red-300 hover:text-red-600 rounded-full '
        onClick={()=>{
          setOpenDeleteConfirmBox(true)
          setDeleteSubCategory(row.original)
        }}
        ><MdDelete size={20} />

</button>
      </div>
    )
  }
 })

]

  return (
    <section>

      <div className='p-2  bg-white shadow-md flex item-center justify-between'>
      <h2 className='font-semibold'>Sub Category</h2>
      <button onClick={()=>{setOpenAddSubCategory(true)}} className='active:scale-95 text-sm border font-semibold border-yellow-400 hover:bg-yellow-300 rounded-full px-2 py-2'>Add Sub Category</button>
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable 
        data={data}
        column={column}
        />
      </div>
      {
        openAddSubCategory&&(
          <UploadSubCategoryModel 
  close={() => setOpenAddSubCategory(false)} 
  fetchData={fetchSubCategory}
/>

        )
      }
      
      {imageUrl&&
        <ViewImage url={imageUrl} close={()=>setImageUrl("")}/> 
      }
      {openEdit&&
        <EditSubCategory 
        data={editData}
        close={()=>setOpenEdit(false)} 
        fetchData={fetchSubCategory}/>
      }
      {
        openDeleteConfirmBox&&(
          <ConfirmBox
          cancel={()=>setOpenDeleteConfirmBox(false)}
          close={()=>setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubcategory}
          />
        )
      }
      </section>
  )
}

export default Subcategory
 