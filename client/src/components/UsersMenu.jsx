import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from "../utils/isAdmin.js";
const UsersMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {" "}
          {user.name || user.mobile}
          <span className="text-meedium text-red-600">
            {user.role=='ADMIN'? "(Admin)":""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="active:scale-95 hover:text-yellow-400"
        >
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
{
          isAdmin(user.role)&&(
                 <Link
          onClick={handleClose}
          to={"/dashboard/category"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          Category
        </Link>
          )
        }
       {
          isAdmin(user.role)&&( 
        <Divider />)
        }
       

        {
          isAdmin(user.role)&&(
           <Link
          onClick={handleClose}
          to={"/dashboard/subcategory"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          Subcategory
        </Link>
          )
        }
          {
          isAdmin(user.role)&&(
        <Divider />)
        }
         {
          isAdmin(user.role)&&(
         <Link
          onClick={handleClose}
          to={"/dashboard/upload-products"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          Upload Products
        </Link>
          )}
        
      {
          isAdmin(user.role)&&(  <Divider />)}
        <Link
          onClick={handleClose}
          to={"/dashboard/products"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          Products
        </Link>
        <Divider />
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          My Orders
        </Link>
        <Divider />
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-1 active:scale-95 hover:bg-orange-200"
        >
          Saved Address
        </Link>
        <Divider />
        <button
          onClick={handleLogout}
          className="active:scale-95 text-left px-2 hover:bg-red-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UsersMenu;
