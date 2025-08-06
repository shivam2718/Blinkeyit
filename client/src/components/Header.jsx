import React, { useState } from "react";
import Search from "./search";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UsersMenu from "./UsersMenu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";
  const cartItem=useSelector(state=>state.cartItem.cart)
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log("cartItem",cartItem)
  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };
  const handleMobileUser=()=>{
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/user")
  }
  useEffect(() => {
  const qty = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
  const price = cartItem.reduce((prev, curr) => {
  const actualPrice = curr.price - (curr.price * (curr.discount || 0)) / 100;
  return prev + curr.quantity * actualPrice;
}, 0);


  setTotalQty(qty);
  setTotalPrice(price);
}, [cartItem]);

  return (
    <header className="h-24
     lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white  px-2">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-2">
          {/*logo*/}
          <Link to="/" className="h-full flex justify-center items-center">
            <img
              src={logo}
              alt="Logo"
              width={170}
              height={60}
              className="hidden lg:block"
            />
            <img
              src={logo}
              alt="Logo"
              width={120}
              height={60}
              className="lg:hidden"
            />
          </Link>

          {/*search // lg:block make thing visible for the desktop mode  */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/*login and my cart */}
          <div>
            {/*user icon is only displayed in mobile version */}
            <button className=" lg:hidden" onClick={handleMobileUser}>
              <FaRegCircleUser size={26} />
            </button>

            {/*this is for desktop part */}

            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none "
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <VscTriangleUp size={25} />
                    ) : (
                      <VscTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 h-20 top-12">
                      <div className="bg-white lg:shadow-lg rounded p-4 min-w-52">
                        <UsersMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg  px-2">
                  Login
                </button>
              )}

              <button className="flex items-center gap-2  bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                {/* add to cart icon */}
                <div className="animate-bounce">
                  <GiShoppingCart size={36} />
                </div>
                <div className="font-semibold">
                  {
                    cartItem[0]?(
                      <div>
                        <p className="text-sm">{totalQty} items</p>
                        <p className="text-sm flex items-center gap-1">
                          <MdOutlineCurrencyRupee />
                          {totalPrice}.00
                        </p>
                        </div>
                    ):(
                    <p>My Cart</p>
                    )
                  }
                 
                </div>
               
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden container mx-auto flex items-center px-2 justify-between">
        <Search />
      </div>
    </header>
  );
};

export default Header;
