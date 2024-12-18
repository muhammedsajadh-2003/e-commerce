import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      },
      totalPrice: { 
        type: Number, 
        required: true 
      }
    }
  ],
  totalCartPrice: { 
    type: Number, 
    default : 0
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;