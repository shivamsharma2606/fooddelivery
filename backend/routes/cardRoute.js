import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartcontrollers.js"
import authMiddleware from "../middleware/auth.js";


const cardRouter =express.Router();

cardRouter.post("/add", authMiddleware,addToCart)
cardRouter.post("/removeFromCart", authMiddleware,removeFromCart)
cardRouter.post("/getCart", authMiddleware,getCart)


export default cardRouter;
