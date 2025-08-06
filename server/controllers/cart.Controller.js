import CartProductModel from '../models/cartproduct.model.js'
import UserModel from '../models/user.model.js'

export const addTocartItemcontroller =async (request,response)=>{
    try{
const userId = request.userId
const {productId} =request.body
if(!productId){
    return response.status(402).json({
     messege:"provide productId",
     error:true,
     success:false
    })
}
const checkItemCart= await CartProductModel.findOne({
    userId:userId,
    productId:productId
})
if(checkItemCart){
    return response.status(200).json({
        message:"item already in cart",
        error:false,
        success:true
    })
}
const cartItem = new CartProductModel({
    quantity:1,
    userId:userId,
    productId:productId
})
const save =await cartItem.save()
const updateCartUser =await UserModel.updateOne({_id:userId},{
    $push:{
        shopping_cart :productId
    }
})
return response.json({
    data:save,
    message:"item added sucessfully",
    error:false,
    success:true
})
    }catch(error){
   return response.status(500).json({
    messege:error,
    success:true,
    error:false
   })
    }
}
export const getCartItemController = async (request, response) => {
  try {
    const userId = request.userId
    const cartItem = await CartProductModel.find({ userId: userId }).populate('productId')
    
    return response.json({
      data: cartItem,
      message: "Cart items fetched successfully",
      error: false,
      success: true
    })
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
      success: false,
      error: true
    })
  }}