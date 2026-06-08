import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,

    password: {
      type: String,
      required: true
    },
    address: String
  },
  
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);