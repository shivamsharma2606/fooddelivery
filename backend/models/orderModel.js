import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true }, // fixed spelling
  address: { type: Object, required: true }, // fixed object type
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, required: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
