import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

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

// Home route for Render test
app.get("/", (req, res) => {
  res.send("The Golden Fork Backend API is running successfully 🚀");
});

// Routes
app.use("/customers", CustomerRouter);
app.use("/menu-items", MenuItemRouter);
app.use("/orders", OrderRouter);
app.use("/reservations", ReservationRouter);
app.use("/reviews", ReviewRouter);
app.use("/admin", AdminRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });