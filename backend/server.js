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

// ✅ Open CORS for testing (Not recommended for production)
app.use(cors({
  origin: '*'
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
