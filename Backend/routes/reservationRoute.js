import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationsByCustomer,
  updateReservation,
  deleteReservation,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getAllReservations);

// Keep specific routes before /:id
router.get("/customer/:customerId", getReservationsByCustomer);

router.get("/:id", getReservationById);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.put("/:id/status", updateReservationStatus);

export default router;
