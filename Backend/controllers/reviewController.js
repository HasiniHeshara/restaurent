import Review from "../models/reviewModel.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer")
      .populate("menuItem");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEW BY ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("customer")
      .populate("menuItem");

    if (!review)
      return res.status(404).json({ message: "Review not found" });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS BY MENU ITEM
export const getReviewsByMenuItem = async (req, res) => {
  try {
    const reviews = await Review.find({ menuItem: req.params.menuItemId })
      .populate("customer");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE REVIEW
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });

    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review)
      return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
