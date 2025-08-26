import React from 'react'
import uploadImage from '../utils/uploadImage';
import { MdCloseFullscreen } from "react-icons/md";
import { useState } from 'react'
import Axios from '../utils/Axios'; // This already has baseURL configured
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast'; 
import SummaryApi, { baseURL } from '../common/SummaryApi'; // Import baseURL

const EditCategory=({close,fetchData,data:categoryData})=>{
     const [data,setData]=useState({
           _id:categoryData._id,
           name:categoryData.name,
           image:categoryData.image
       })
       const [loading ,setLoading]=useState(false)
   
       const handleOnChange = (e) => {
           const {name,value} = e.target;
           setData(prev => ({
               ...prev,
               [name]: value
           }));
       }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
  ...SummaryApi.updateCategory,
  
  data: {
    categoryId: data._id,
    name: data.name,
    image: data.image
  }

});
            const responseData = response.data;
            if (responseData.success) {
                  
                toast.success(responseData.message);
                close();
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }

        const handleUploadCategoryImages = async (e) => {
           

        const file = e.target.files[0];
        if (!file) {
            return;
        }
        try {
             
            setLoading(true)
            const response = await uploadImage(file);
            if (response.data?.success) {
                setLoading(false)
                setData(prev => ({
                    ...prev,
                    image: response.data.data.secure_url
                }));
            }
        } catch (error) {
             setLoading(false)
            toast.error("Error uploading image");
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center'>
                   <div className='rounded bg-white w-full max-w-4xl p-4'>
                       <div className='flex items-center justify-between'>
                           <h1 className='font-semibold'>Update Category</h1>
                           <button onClick={close} className='w-fit block ml-auto'>
                               <MdCloseFullscreen size={25} />
                           </button>
                       </div>
                       <form className="my-3" onSubmit={handleSubmit}>
                           <div className='grid gap-1'>
                               <label htmlFor="categoryName">Name</label>
                               <input 
                                   type="text"
                                   id='categoryName'
                                   placeholder='Enter category name' 
                                   value={data.name}
                                   name='name'
                                   onChange={handleOnChange}
                                   className='bg-green-50 border border-green-100 focus-within:border-yellow-300 outline-none p-2'
                                   required
                               />
                           </div>
                           <div>
                               <p>Images</p>      
                               <div className='flex gap-4 flex-col lg:flex-row items-start lg:items-center'>
                                   <div className='border bg-green-50 w-full h-36 lg:w-36 flex items-center justify-center rounded border-neutral-300'>
                                       {data.image ? (
                                           <img
                                               alt='category'
                                               src={data.image}
                                               className='w-full h-full object-scale-down'
                                           />
                                       ) : (
                                           <p className='text-sm text-neutral-400'>No Image</p>
                                       )}
                                   </div>
                                   <label htmlFor="uploadCategoryImage">
                                       <div className={`${!data.name ? 'bg-gray-400' : 'border-yellow-400 border'} px-4 py-1 rounded cursor-pointer`}>
                                          
                                           {
                                            loading?"Loading":" Upload Image"
                                           }
                                       </div>
                                       <input 
                                           disabled={!data.name} 
                                           onChange={handleUploadCategoryImages} 
                                           type="file" 
                                           id='uploadCategoryImage' 
                                           className='hidden'
                                           accept="image/*"
                                       />
                                   </label> 
                               </div>
                           </div>
                           <button 
                               className={`mt-3 p-2 rounded w-full font-semibold hover:bg-yellow-400 ${(data.name && data.image) ? "bg-yellow-300" : "bg-slate-400"}`}
                               disabled={loading || !data.name || !data.image}
                           >
                               Update Category
                           </button>
                       </form>
                   </div>
               </section>
    )
}
export default EditCategory