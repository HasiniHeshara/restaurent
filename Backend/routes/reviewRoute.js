import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByMenuItem,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

// Get reviews for a specific menu item
router.get("/menu-item/:menuItemId", getReviewsByMenuItem);

export default router;
