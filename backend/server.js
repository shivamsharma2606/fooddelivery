import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/useroutes.js";
import 'dotenv/config';
import cardRouter from "./routes/cardRoute.js";
import orderRouter from "./routes/orderRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

const allowedOrigins = [
  'https://admin-fooddelivery.vercel.app',
  'https://fooddelivery-chi-swart.vercel.app',
  'https://fooddelivery-mrpsd0ask-shivam-sharmas-projects-e201c5e1.vercel.app'  // नया domain जो console में दिख रहा था
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// db connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cardRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => {
  res.send("API Working");
});

// server listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
