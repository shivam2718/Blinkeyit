import { Router } from "express"
import auth from "../middleware/auth.js"
import {addTocartItemcontroller, getCartItemController} from "../controllers/cart.Controller.js"
const cartRouter =Router()
cartRouter.post('/create',auth,addTocartItemcontroller)
cartRouter.get("/get",getCartItemController)
export default cartRouter