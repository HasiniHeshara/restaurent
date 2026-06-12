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
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing in environment variables");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Health route for Render
app.get("/", (req, res) => {
  res.send("The Golden Fork Backend API is running successfully 🚀");
});

// API routes
app.use("/customers", CustomerRouter);
app.use("/menu-items", MenuItemRouter);
app.use("/orders", OrderRouter);
app.use("/reservations", ReservationRouter);
app.use("/reviews", ReviewRouter);
app.use("/admin", AdminRouter);

// Optional /api routes also work
app.use("/api/customers", CustomerRouter);
app.use("/api/menu-items", MenuItemRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/reservations", ReservationRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/admin", AdminRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// MongoDB connection and server start
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
