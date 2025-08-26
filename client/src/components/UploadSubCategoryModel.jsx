import { MdCloseFullscreen } from "react-icons/md";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import uploadImage from '../utils/uploadImage'
import { useSelector } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast"; 
import AxiosToastError from "../utils/AxiosToastError";
const UploadSubCategoryModel=({close,fetchData })=>{
    const [subCategorydata,setSubCategoryData]=useState({
      name:"",
      image:"",
      category:[],
    })
    const allCategory =useSelector (state=>state.product.allCategory)
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setSubCategoryData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
        });
    }
    const handleUploadSubCategoryImage=async(e)=>{
       const file =e.target.files[0]
       if(!file){
        return
       }
        const response = await uploadImage(file);
           if (response.data?.success && response.data.data?.secure_url) {
  setSubCategoryData(prev => ({
    ...prev,
    image: response.data.data.secure_url
  }));
} else {
  console.error("Image upload failed", response);
  toast.error("Image upload failed");
}
}
    const handleRemoveCategorySelected=(categoryId)=>{
    const index= subCategorydata.category.findIndex(el=>el._id===categoryId)
   subCategorydata.category.splice(index,1)
   setSubCategoryData((prev)=>{
    return {
        ...prev
    }
   })
    }
    const handleSubmitSubCaategory=async(e)=>{
        e.preventDefault()
        try {
            const response=await Axios({
                ...SummaryApi.createSubcategory,
                data:subCategorydata
            })
           const {data:responseData}=response
           if(responseData.success){
            toast.success(responseData.message)
            if(fetchData){
                fetchData()
            }
            if(close){
                close()
            }

           }
            
        } catch (error) {
           AxiosToastError(error)
        }
    }
    
    return (
        <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-800/60  flex items-center justify-center p-4">
       <div className=" max-w-5xl bg-white w-full  p-4 z-40 rounded-lg">
 <div className=" flex items-center justify-between gap-3  ">
    <h1 className="font-semibold">
    Add Sub Category
 </h1>
 <button>
<MdCloseFullscreen onClick={close} size={20} />
 </button> 
 </div>

 <form 
 onSubmit={handleSubmitSubCaategory}
 className="my-3 grid gap-3"
 >
 
    <div className="grid gap-1">
  <label htmlFor="name">
   Name
  </label>
  <input
                            type="text"
                            id='name'
                            name="name"
                            value={subCategorydata.name}
                            onChange={handleChange}
                            placeholder='Enter Sub category name' 
                            className='bg-green-50 border border-green-300 focus-within:border-yellow-300 outline-none p-3 rounded'
                            required
  />
 </div>

 <div>
    <p>
   Image
  </p>
  <div className="flex flex-col lg:flex-row items-center gap-3">
    <div className="border h-36 w-full lg:w-36 bg-green-50 border-green-300 focus-within:border-yellow-300 outline-none flex items-center justify-center rounded">
 {
   !subCategorydata.image?(
   <p className="text-sm text-neutral-400">No Image</p>
   ):(
       <img
                                        alt='subCategory'
                                        src={subCategorydata.image}
                                        className='w-full h-full object-scale-down rounded'
                                    />
   )
 }

  </div>
  <label htmlFor="uploadSubCategoryImage">
<div className="px-4 py-1 border border-yellow-300 text-yellow-500 rounded hover:bg-yellow-300 hover:text-white  cursor-pointer ">
    upload Image
  </div>
  <input 
  type="file"
  id="uploadSubCategoryImage"
  className="hidden"
  onChange={handleUploadSubCategoryImage}
  />
  </label>
  
  </div>
  
 </div>
 <div className="grid gap-1">
<label>
    Select Category
 </label>
 <div className="focus-within:border-yellow-300">
    <div className="flex flex-wrap gap-3">
        {
        subCategorydata.category.map((cat,index)=>{
            return(
                <div  className=" flex items-center gap-1 bg-green-200 shadow-md  px-1 m-1 mb-2 rounded" key={cat._id+"selectedvalue"}>
                    {cat.name}
                    <div className="cursor-pointer hover:text-red-500"
                    onClick={()=>handleRemoveCategorySelected(cat._id)}
                    >
                   <IoIosClose size={20} />
                    </div>
                </div>
            )
        })
    }
    </div>
    {/*display values*/}

     <select 
     onChange={(e)=>{
        const value=e.target.value
        const categoryDetails = allCategory.find(el=>el._id== value) 
        setSubCategoryData((prev)=>{
            return {
                ...prev,
                category:[...prev.category,categoryDetails]
            }
        })
     }}
     className="bg-transparent border p-2 w-full outline-none rounded">
  <option value="" disabled selected hidden>Select Category</option>
  {
    allCategory.map((category,index)=>{
        return( <option value={category?._id}
        key={category._id+"subcategory"}
        >
            {category?.name}
            </option>)
    })
  }
</select>


    {/*select category */}
  </div>
 </div>
 <button className={`px-4 py-1 border rounded
    ${!subCategorydata.name || !subCategorydata.image || !subCategorydata.category[0] ? "bg-gray-300":"bg-yellow-200 text-black hover:bg-amber-400"}
     font-semibold`}>
    Submit
 </button>
  
 </form>
       </div>
        </section>
    )
}
export default UploadSubCategoryModel
 