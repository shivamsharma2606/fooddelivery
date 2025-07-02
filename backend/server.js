import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/useroutes.js";
import 'dotenv/config';
import cardRouter from "./routes/cardRoute.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());

const allowedOrigins = [
  'https://admin-fooddelivery.vercel.app', 
  'https://fooddelivery-chi-swart.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Agar origin blank hai (Postman ya server-side call), ya allowed list me hai to allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cardRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
