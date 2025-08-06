import { Router } from "express"
import auth from "../middleware/auth.js"
import {addTocartItemcontroller, getCartItemController,updateCartItemQtyController  } from "../controllers/cart.Controller.js"
const cartRouter =Router()
cartRouter.post('/create',auth,addTocartItemcontroller)
cartRouter.get("/get",getCartItemController)
cartRouter.put("/update-qty", auth, updateCartItemQtyController)
export default cartRouter