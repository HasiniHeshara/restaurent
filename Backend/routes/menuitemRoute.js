import express from "express";
import {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  getItemsByCategory
} from "../controllers/menuitemController.js";

const router = express.Router();

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.get("/category/:category", getItemsByCategory);

export default router;
