import { response } from 'express'
import CategoryModel from '../models/category.model.js'
import ProductModel from '../models/product.model.js'
import SubCategoryModel from '../models/subCategory.model.js'

export const AddCategoryController=async(request,response)=>{
    try{
        const {name,image}=request.body
        if(!name||!image){
            return response.status(400).json ({
                message:"enter required feilds",
                error:true,
                success:false
            })
        }
     const addCategory =new CategoryModel({
    name,
    image
     })

     const saveCategory =await  addCategory.save()

     if(!saveCategory){
        return response.status(500).json({
            message:"not created",
            error:true,
            success:false
        })
     }
     return response.json({
        message:"Added category",
        data:saveCategory,
        error:false,
        success:true
     })

    }catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }}
export const getCategoryController=async(request,response)=>{
    try {
        
        const data=await CategoryModel.find()
        return response.json({
            data:data,
            error:false,
            success:true
        })
    } catch (error) {
        return response.status(500).json({
            message:error.message|| error,
            error:true,
            success:false
        })
    }
}

export const updateCategoryController =async (request,response)=>{
    try {
        const {categoryId,name,image}= request.body
        const update=await CategoryModel.updateOne({
           _id:categoryId //2.25.48
        },{
name,
image
        })
        return response.json({
            message:"category updated !!",
            error:false,
            success:true
        })
    } catch (error) {
       return response.status(500).json({
        error:true,
        message:error,
        success:false

       }) 
    }
}

export const deleteCategoryController =async(request,response)=>{
    try {
       const {_id}=request.body
       const checkSubCategory=await SubCategoryModel.find({
        category:{
            "$in":[ _id ]
        }
       }).countDocuments()
        
       const checkProduct=await ProductModel.find({
        category:{
            "$in":[ _id ]
        }
       }).countDocuments()

       if(checkSubCategory>0||checkProduct>0){
        return response.status(400).json({
        message:"Category is in use. Can't delete",
        success:true,
        error:true,
    
    })
       }
    const deleteCategory   = await CategoryModel.deleteOne({_id:_id})
    return response.json({
        message:"Category deleted sucessfully",
        data:deleteCategory,
        error:false,
        success:true
    })

    } catch (error) {
      return response.status(500).json({
            message:error.message||error,
            success:false,
            error:true
        })  
        
    }
}
