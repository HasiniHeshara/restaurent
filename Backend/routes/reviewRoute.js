import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByMenuItem,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);

// Keep specific routes before /:id
router.get("/menu-item/:menuItemId", getReviewsByMenuItem);

router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
