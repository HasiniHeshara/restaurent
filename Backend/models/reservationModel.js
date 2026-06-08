import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    tableNumber: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    numberOfGuests: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: "Booked"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
