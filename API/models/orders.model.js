import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  method: { type: String, required: false },
  handler: { type: String, required: false },
  userId: {
    type: String,
    required: false,
  },
  products: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      ItemPrice: { type: Number, required: true },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
