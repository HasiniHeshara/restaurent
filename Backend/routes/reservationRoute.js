import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  updateReservationStatus
} from "../controllers/reservationController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

// Update only reservation status
router.put("/:id/status", updateReservationStatus);

export default router;
