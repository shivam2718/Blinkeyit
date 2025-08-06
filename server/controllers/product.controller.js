import ProductModel from '../models/product.model.js';

export const createProductController=async(request,response)=>{
    try {
        const { name,
   image,
   category,
   subCategory,
   unit,
   stock,
   price,
   discount,
   description,
   more_details,
   publish
  }=request.body
  if(!name||!image.length||!category.length||!subCategory.length||!unit||!price||!description)   {
    return response.status(400).json({
        message:"enter all required values",
        error:true,
        success:false
    })
  }
  const product =new ProductModel({
    name,
     image,
   category,
   subCategory,
   unit,
   stock,
   price,
   discount,
   description,
   more_details,
   publish
  })
  const saveProduct =await product.save()
  return response.json({
    message:"product created successfully",
    data:saveProduct,
    error:false,
    success:true
  }
  )
  

    } catch (error) {
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}

export const getProductController = async (request,response)=>{
  try {
    let {page,limit,search}=request.body
  if(!page){
    page=1
  }
  if(!limit){
    limit=10
  } 
    const query = search?{
$text:{$search: search}
    }:{}
    const skip =(page-1)*limit
   
    const  [data,totalCount]= await Promise.all([
      ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
      ProductModel.countDocuments(query)  
    ])
    return response.json({
      message:"product data",
            error:false,
            success:true,
       totalCount:totalCount,
            totalNoPage:Math.ceil(totalCount/limit),
            data:data
    })
  } catch (error) {
      return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false,
           
        })
  }
}

export const getProductByCategory=async(request,response)=>{
  try {
    const {id}=request.body
    if(!id){
      return response.status(400).json({
        message:"category id is required",
        error:true,
        success:false
      })
    }
    const product =await ProductModel.find({
      category:{$in: id}
    }).limit(15).sort({createdAt:-1})
    return response.json({
      message:"product by category",
      data:product,
      error:false,
      success:true
    })
    
  } catch (error) {
    return response.status(500).json({
      message:error.message||error,
      error:true,
      success:false
    })
  }
}

export const getProductByCategoryAndSubCategory  = async(request,response)=>{
 console.log("from getProductByCategoryAndSubCategory controller")
    try {
        const { categoryId,subCategoryId,page,limit } = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }
      

        const query = {
            category : { $in :categoryId  },
            subCategory : { $in : subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])
    
        return response.json({
     
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request,response)=>{
  try {
    let {productId}=request.body
    const product= await ProductModel.findOne({_id:productId})
    return response.json({
      message:"product details",
      error:false,
      data:product,
      success:true
    })
  } catch (error) {
  return response.stauts(500).json({
    message:error.message||error,
    error:true,
    success:false
  })  
  }
}

export const updateProductDetails=async(request,response)=>{

try {
  
  const {_id}=request.body
if(!_id){
return response .status(400).json({
  message:"provide product id",
  error:true,
  success:false
})
}



const updateProduct = await ProductModel.updateOne({_id:_id},{
  ...request.body
})
return response.json({
  message:"updates made successfully",
  data:updateProduct,
  error:false,
  success:true
})
} catch (error) {
  return response.status(500).json({
    message:error.message||error,
    error:true,
    success:false
  })  
  }

}
export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//search product

export const searchProduct = async(request,response)=>{
  try {
    let {search,page,limit}=request.body
    if(!page){
      page=1
    }
    if(!limit){
      limit=10
    }
    const query = search?{
   $text : {
    $search:search
   }
    }:{}
    const skip = (page-1)*limit
const [data,dataCount] = await Promise.all([
  ProductModel.find(query).sort({createdAt:-1}).skip(skip).limit(limit).populate('category','subCategory'),
  ProductModel.countDocuments(query)
])
return response.json({
  message:"product data ",
  success:true,
  error:false,
  data:data,
  totalCount:dataCount,
  totalPage:Math.ceil(dataCount/limit),
  page:page,
  limit:limit
})
  } catch (error) {
     return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
  }
}