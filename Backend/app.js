import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import CustomerRouter from "./routes/customerRoute.js";
import MenuItemRouter from "./routes/menuitemRoute.js";
import OrderRouter from "./routes/orderRoute.js";
import ReservationRouter from "./routes/reservationRoute.js";
import ReviewRouter from "./routes/reviewRoute.js";
import AdminRouter from "./routes/adminRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/customers", CustomerRouter);
app.use("/menu-items", MenuItemRouter);
app.use("/orders", OrderRouter);
app.use("/reservations", ReservationRouter);
app.use("/reviews", ReviewRouter);
app.use("/admin", AdminRouter);

// MongoDB connection
mongoose.connect("mongodb+srv://user:LK7Q0ANoss1Gyx79@cluster0.ykdbywy.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch(err => console.log(err));



