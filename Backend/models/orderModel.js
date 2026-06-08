import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String
    },

    orderType: {
      type: String,
      enum: ["Pickup", "Delivery"],
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      required: true
    },

    items: [
      {
        name: String,
        price: Number,
        qty: Number,
        image: String
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "Placed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
