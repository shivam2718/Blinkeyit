
import {Router} from 'express'
import { CashOnDeliveryOrderController,paymentController } from '../controllers/order.controller.js';
import auth from '../middleware/auth.js'
const OrderRouter = Router();

OrderRouter.post('/cash-on-delivery', auth,CashOnDeliveryOrderController);
OrderRouter.post('/checkout', auth,paymentController);
export default OrderRouter;


