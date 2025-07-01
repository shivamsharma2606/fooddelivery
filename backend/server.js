import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/useroutes.js"
import 'dotenv/config'
import cardRouter from "./routes/cardRoute.js"
import orderRouter from "./routes/orderRoutes.js"
//app config
const app = express()
const port =4000

//middleware
app.use(express.json())
const allowedOrigins = [
  'https://admin-fooddelivery.vercel.app', 
  'https://fooddelivery-chi-swart.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


//db connection

connectDB();

//api ednpoint

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cardRouter)
app.use("/api/order",orderRouter)
app.get("/", (req,res)=>{
    res.send("API Working")
})


//mongodb+srv://project:shivam2005@cluster0.ge3hs7u.mongodb.net/?

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})