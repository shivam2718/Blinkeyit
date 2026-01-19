import React, { useState } from "react";
import Search from "./search";
import logo from "../assets/image.png";
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
import DisplayCartItem from "./DisplayCartItem";
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
  const [notDiscountPrice,setNotDiscountPrice] = useState(0);
  const [openCartSection,setOpenCartSection] = useState(false);
//  console.log("cartItem",cartItem)
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
    const actualPrice =
      curr.productId.price -
      (curr.productId.price * (curr.productId.discount || 0)) / 100;
      
    return prev + curr.quantity * actualPrice;
  }, 0);

  setTotalQty(qty);
  setTotalPrice(price);
  const notDiscountPrice = cartItem.reduce((prev,curr) => {
    return prev + curr.quantity * curr.productId.price;
  }, 0);
  setNotDiscountPrice(notDiscountPrice);
}, [cartItem]);

  return (
    <header className="h-24 lg:h-20 bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40 flex flex-col justify-center gap-1 border-b border-gray-200/50">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-2">
          {/*logo*/}
          <Link to="/" className="h-full flex justify-center items-center hover:scale-105 transition-transform duration-200">
            <img
              src={logo}
              alt="Logo"
              width={170}
              height={60}
              className="hidden lg:block drop-shadow-sm"
            />
            <img
              src={logo}
              alt="Logo"
              width={120}
              height={60}
              className="lg:hidden drop-shadow-sm"
            />
          </Link>

          {/*search // lg:block make thing visible for the desktop mode  */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/*login and my cart */}
          <div>
            {/*user icon is only displayed in mobile version */}
            <button className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <FaRegCircleUser size={26} />
            </button>

            {/*this is for desktop part */}

            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none hover:text-emerald-600 transition-colors duration-200"
                    onClick={() => setOpenUserMenu(true)}
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
                      <div className="bg-white/95 backdrop-blur-md lg:shadow-xl rounded-xl p-4 min-w-52 border border-gray-200/50">
                        <UsersMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-4 py-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium">
                  Login
                </button>
              )}

              <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-4 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
               onClick={()=>setOpenCartSection((prev)=>!prev)}
              >
                {/* add to cart icon */}
                <div className="animate-bounce">
                  <GiShoppingCart size={28} />
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
      <div>
       { openCartSection&&(
<DisplayCartItem close={()=>setOpenCartSection(false)}/>
        )
}
</div>
    </header>
  );
};

export default Header;
