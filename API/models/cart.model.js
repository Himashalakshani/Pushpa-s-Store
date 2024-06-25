import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  ItemPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
