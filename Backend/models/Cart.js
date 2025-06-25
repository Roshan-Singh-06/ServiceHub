import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: { type: String, required: true }, // _id or id of the service/package
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
      time: { type: String },
      desc: { type: String },
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartItemSchema);
export default Cart;
