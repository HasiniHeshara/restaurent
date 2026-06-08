import Reservation from "../models/reservationModel.js";

// CREATE RESERVATION
export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL RESERVATIONS
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("customer");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET RESERVATION BY ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("customer");

    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RESERVATION
export const updateReservation = async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Reservation not found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE RESERVATION
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RESERVATION STATUS
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    reservation.status = status;
    await reservation.save();

    res.json({ message: "Reservation status updated", reservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
