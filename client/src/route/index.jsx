import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/otpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import Products from '../pages/ProductsAdmin'
import Subcategory from '../pages/SubcategoryPage'
import UploadProducts from '../pages/UploadProductsPage'
import Category from '../pages/CategoryPage'
import AdminPermission from "../layout/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"search",
                element:<SearchPage/>
            },
            {
            path:"login",
            element:<Login/>
            },
            {
            path:"register",
            element:<Register/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"verify-forgot-password-otp",
                element:<OtpVerification/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"user",
                element:<UserMenuMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[{
                    path:"profile",
                    element:<Profile/>
                },
                {
                    path:"myorders",
                    element:<MyOrders/>
                },
                {
                    path:"address",
                    element:<Address/>
                },{
                    path:"category",
                    element:<AdminPermission><Category/></AdminPermission>
                },
                {
                    path:"subcategory",
                    element:<AdminPermission><Subcategory/></AdminPermission>
                },
                {
                    path:"upload-products",
                    element:<AdminPermission><UploadProducts/></AdminPermission>
                },{
                    path:"products",
                    element:<Products/>
                }
                ]
            },{
                path: ":category",
                children: [
                    {
                        path:":subcategory",
                        element:<ProductListPage/>
                    }
                ]
            },
            {
             path:"product/:product",
             element:<ProductDisplayPage/>
            }


        ]
    }
]);

export default router;