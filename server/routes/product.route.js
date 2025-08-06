import {Router} from 'express'
import {createProductController,getProductController,getProductByCategory,getProductByCategoryAndSubCategory,getProductDetails,updateProductDetails,deleteProductDetails,searchProduct} from '../controllers/product.controller.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/Admin.js'
const productRouter =Router()
productRouter.post("/create",auth,admin,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details",getProductDetails)
productRouter.put('/update-product-details',auth,admin,updateProductDetails)
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)
productRouter.post('/search-product',searchProduct)
export default productRouter