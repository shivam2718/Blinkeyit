import { getProductByCategory, searchProduct, updateProductDetails } from "../../../server/controllers/product.controller";

/*export const baseURL="http://localhost:8080"
const SummaryApi={
    register:{
     url: '/api/user/register' ,
     method:'POST' 
    },
    login:{
        url:"/api/user/login",
        method:"POST"
    },
    forgot_password:{
        url:"/api/user/forgot-password",
        method:"PUT"
    },
    forgot_password_otp_verification:{
     url:"/api/user/verify-forgot-password-otp",
     method:"put"
    },
    resetPassword:{
        url:"/api/user/reset-password",
        method:"PUT"
    },
    refreshToken:{
        url:"api/user/refresh-token",
        method:"POST"
    }
}
export default SummaryApi;
*/
export const baseURL = import.meta.env.VITE_API_URL;
const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'POST'
    },
    login: {
        url: "/api/user/login",
        method: "POST"
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "PUT"
    },
    forgot_password_otp_verification: {
        url: "/api/user/verify-forgot-password-otp",
        method: "put"
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "PUT"
    },
    refreshToken: {
        url: "api/user/refresh-token",
        method: "POST"
    },
    userDetails:{
        url :"/api/user/user-details",
        method:"GET"
    },
    logout:{
         url :"api/user/logout",
         method:"GET"
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"PUT"
    },
    updateUserDetails:{
    url:'/api/user/update-user',
    method:'PUT'
    },
    addCategory:{
        url:'/api/category/add-category',
        method:'POST'
    },
    uploadImage:{
        url:'/api/file/upload',
        method:'post'
    },
    getCategory:{
    url:'/api/category/get',
    method:'GET'
    },
    updateCategory:{
         url:'/api/category/update',
        method:'PUT'
    },
    deleteCategory:{
          url:'/api/category/delete',
        method:'DELETE'
    }
    ,createSubcategory:{
        url:'/api/subcategory/create',
        method:'POST'
    },
    getSubcategory:{
        url:'/api/subcategory/get',
        method:'POST'
    },
    updateSubCategory:{
        url:'/api/subcategory/update',
        method:'PUT'
    },
    deleteSubCategory:{
        url:'/api/subcategory/delete',
        method:'DELETE'
    },
    createProduct:{
        url:'/api/product/create',
        method:'POST'
    },
    getProduct:{
        url:'/api/product/get',
        method:'post'
    },
    getProductByCategory:{
        url:'/api/product/get-product-by-category',
        method:'post'
    },
    getProductByCategoryAndSubcategory:{
        url:'/api/product/get-product-by-category-and-subcategory',
        method:'post'
    },
    getProductDetails:{
        url:'/api/product/get-product-details',
        method:'post'
    },
    updateProductDetails:{
        url:"/api/product/update-product-details",
        method:'put'
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : 'delete'
    },
    searchProduct:{
        url:"/api/product/search-product",
        method:'post'
    },
    addToCart:{
        url:"/api/cart/create",
        method:'post'
    },
    getCartItem:{
     url:'/api/cart/get',
     method:'get'
    },
    updateCartItemQty:{
        url:'/api/cart/update-qty',
        method:'put'
    }
};
export default SummaryApi;