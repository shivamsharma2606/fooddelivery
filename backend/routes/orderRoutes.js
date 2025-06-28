import express from  "express"
import authMiddleware from "../middleware/auth.js"
import { listorders, placeOrder,userOrders,verifyOrder,updatestatus  } from "../controllers/ordercontrollers.js"    
 

const orderRouter = express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listorders);
orderRouter.post("/status",updatestatus);


export default  orderRouter;