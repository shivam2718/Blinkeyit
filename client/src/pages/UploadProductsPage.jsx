import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddFieldComponent from '../components/AddFieldComponent';
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaUpload } from "react-icons/fa";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/axios';
import AxiosToastError from '../utils/axiosToastError'
import successAlert from '../utils/SuccessAlert.js';
const UploadProducts = () => {
  const [data,setData]=useState({
   name:"",
   image:[],
   category:[],
   subCategory:[],
   unit:"",
   stock:"",
   price:"",
   discount:"",
   description:"",
   more_details:{},
   publish:true
  })
  const [imageLoading,setImageLoading]=useState(false)
   const allCategory=useSelector(state=>state.product.allCategory)
  const [viewImageurl,setViewImageUrl]=useState("")
  const [selectCategory,setSelectCategory]=useState("")
    const [selectSubCategory,setSelectSubCategory]=useState("")
    const allSubCategory=useSelector(state=>state.product.allSubCategory)
    const [moreField,setMoreField]=useState([])
    const [openAddField,setOpenAddField]=useState(false)
    const [fieldName,setFeildName]=useState("")
  const handleUploadImage=async(e)=>{
 
 const file = e.target.files[0]
 if(!file){
  return
 }
 setImageLoading(true)
const response = await uploadImage(file);
const imageUrl = response?.data?.data?.url || response?.data?.url;

if (!imageUrl) {
  throw new Error("Image upload failed. No URL received.");
}

setData(prev => ({
  ...prev,
  image: [...prev.image, imageUrl]
}));
  setImageLoading(false)
  } 
  const handleChange=(e)=>{
    const {name,value}=e.target
    setData((preve)=>{
      return{
      ...preve,
      [name]:value
      }
    })
   
  }
  const handleDeleteImage=async(index)=>{
   data.image.splice(index,1)
   setData((prev)=>{
    return {
      ...prev
    }
   })
  }
const handleRemoveCategory = (index) => {
  const updated = [...data.category]
  updated.splice(index, 1)
  setData(prev => ({ ...prev, category: updated }))
}

const handleRemoveSubCategory = (index) => {
  const updated = [...data.subCategory]
  updated.splice(index, 1)
  setData(prev => ({ ...prev, subCategory: updated }))
}
const handleAddFeild=()=>{
  setData((preve)=>{
    return{
      ...preve,
      more_details:{
        ...preve.more_details,
        [fieldName]:"",

      }
    }
  })
  setFeildName("")
  setOpenAddField(false)
}
const handleSubmit=async(e)=>{
e.preventDefault()
console.log("data",data)

try {
  const response =await Axios({
    ...SummaryApi.createProduct,
    data:data
  })
  const{data:responseData}=response
  if(responseData.success){
  successAlert(responseData.message)
  setData({
     name:"",
   image:[],
   category:[],
   subCategory:[],
   unit:"",
   stock:"",
   price:"",
   discount:"",
   description:"",
   more_details:{},
   publish:true
  })
  }
} catch (error) {
  AxiosToastError(error)
}
}

  return (
  <section>
    <div className='p-2  bg-white shadow-md flex item-center justify-between'>
      <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-2'
        onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name'>
              Name
            </label>
            <input
            type='text'
            id='name'
            placeholder='Enter product Name'
            name='name'
            value={data.name}
            onChange={handleChange}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div>
           <div className='grid gap-1'>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
            type='text'
            id='description'
            placeholder='Enter product Description'
            name='description'
            value={data.description }
            onChange={handleChange}
            required
            multiple
            rows={3}
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400 resize-none'
            />
          </div>
           <div>
            <p>
              Image
            </p>
            <div><label htmlFor='productImage' className='bg-green-50 h-24 border rounded flex justify-center items-center cursor-pointer '>
                <div className='text-center flex justify-center items-center flex-col '>
                  {

                    imageLoading?<Loading/>:(
                      <>
                       <FaUpload size={38} />
                <p>Upload Image</p>
                      </>
                    )
                  }
                 
                </div>
                <input
                type='file'
                id='productImage'
                hidden
                accept='image/*'
                onChange={handleUploadImage}
                />
            </label>
            <div className='mt-2 flex flex-wrap gap-4'>
              {/*display uploaded images */}
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index} className='h-40 w-40 min-w-20  '>
                      <div className='absolute  p-1 bg-red-400 rounded text-white hover:text-red-300  cursor-pointer'
                      onClick={()=>handleDeleteImage(index)}
                      >
                        <MdDelete size={20}/>
                      </div>
                      <img
                      src={img}
                      alt={img}
                      className='w-full h-full object-scale-down'
                      onClick={()=>setViewImageUrl(img)}
                      />
                      

                    </div>
                  )
                })
              }
            </div>
            </div>
            
           </div>       
           <div className='grid gap-1'>
            <label>
              Category
            </label>
            <div>
              <select
              className='bg-green-50 border w-full p-2 rounded'
              value={selectCategory}
              onChange={(e)=>{
                const value=e.target.value
                const category=allCategory.find(el=>el._id===value)
                console.log(category)
                setData((preve)=>{
                       return{
                        ...preve,
                        category:[...preve.category,category]
                       }
                })
                setSelectCategory("")
              }}
              >
              <option value={""}>select Category</option>
              {
                allCategory.map((c,index)=>{
                  return(
                    <option value={c._id} >
                           {c.name}
                    </option>
                  )
                })
                  
                
              }
            </select>
            <div className='flex flex-wrap gap-3'> 
              {
              data.category.map((c,index)=>{
                return(
                  <div key={c._id+index+"productsection"}
                  className='flex items-center gap-1 bg-green-50 mt-2'
                  >
                   <p>
                    {c.name}
                   </p>
                   <div className='hover:text-red-600 cursor-pointer'
                   onClick={()=>handleRemoveCategory(index)}>
                    <IoIosClose size={20}/>
                   </div>
                  </div>
                )
              })
            }
            </div>
            </div>
           </div>
           <div className='grid gap-1'>
            <label>
             Sub Category
            </label>
            <div>
              <select
              className='bg-green-50 border w-full p-2 rounded'
              value={selectSubCategory}
              onChange={(e)=>{
                const value=e.target.value
                const SubCategory=allSubCategory.find(el=>el._id===value)
                
                setData((preve)=>{
                       return{
                        ...preve,
                        subCategory:[...preve.subCategory,SubCategory]
                       }
                })
                setSelectSubCategory("")
              }}
              >
              <option value={""}>select Sub Category</option>
              {
                allSubCategory.map((c,index)=>{
                  return(
                    <option value={c?._id} >
                           {c.name}
                    </option>
                  )
                })
                  
                
              }
            </select>
            <div className='flex flex-wrap gap-3'> 
              {
              data.subCategory.map((c,index)=>{
                return(
                  <div key={c._id+index+"subCategorySection"}
                  className='flex items-center gap-1 bg-green-50 mt-2'
                  >
                   <p>
                    {c.name}
                   </p>
                   <div className='hover:text-red-600 cursor-pointer'
                 onClick={() => handleRemoveSubCategory(index)}>
                    <IoIosClose size={20}/>
                   </div>
                  </div>
                )
              })
            }
            </div>
            </div>
           </div>
            <div className='grid gap-1'>
            <label htmlFor='unit'>
              Units
            </label>
            <input
            type='text'
            id='unit'
            placeholder='Enter product units'
            name='unit'
            value={data.unit}
            onChange={handleChange}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div> 
          <div className='grid gap-1'>
            <label htmlFor='stock'>
             Number of  Stock
            </label>
            <input
            type='text'
            id='stock'
            placeholder='Enter product units'
            name='stock'
            value={data.stock}
            onChange={handleChange}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div> 
          <div className='grid gap-1'>
            <label htmlFor='price'>
             Price
            </label>
            <input
            type='number'
            id='price'
            placeholder='Enter product price'
            name='price'
            value={data.price}
            onChange={handleChange}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div>                
         <div className='grid gap-1'>
            <label htmlFor='discount'>
             Discount
            </label>
            <input
            type='number'
            id='discount'
            placeholder='Enter product discount'
            name='discount'
            value={data.discount}
            onChange={handleChange}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div> 

          <div >
{
  Object.keys(data.more_details).map((k,index)=>{
    return (
      <div>
        <div className='grid gap-1'>
            <label htmlFor={k}>
             {k}
            </label>
            <input
            id={k}
            type='text'
           
            value={data.more_details[k]}
            onChange={(e)=>{
              const value =e.target.value
              setData((preve)=>{
                return{
                  ...preve,
                  more_details:{
                    ...preve.more_details,
                    [k]:value
                  }

                }
              })
            }}
            required
            className='bg-green-50 p-2 outline-none border border-gray-300
            rounded
            focus:border-amber-400'
            />
          </div> 
        </div>
    )
  })
}
         </div>
 <div 
 onClick={()=>{
  setOpenAddField(true)
 }}
 className='inline-block bg-green-200 py-1 px-3 w-36 text-center font-semibold border border-green-700 hover:bg-yellow-300 hover:text-neutral-800  rounded  '>
  Add More details
 </div>
<button
  type="submit"
  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
>
  Submit
</button>

        </form>
      </div>
      {
      viewImageurl&&<ViewImage url={viewImageurl} close={()=>setViewImageUrl("")}/>
      }

      {
        openAddField&&(
         <AddFieldComponent
  close={() => setOpenAddField(false)}
  value={fieldName}
  onChange={(e) => setFeildName(e.target.value)}
  submit={handleAddFeild}
/>
        )
      }
  </section> 
  )
}

export default UploadProducts
