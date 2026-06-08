import express from "express";
import {
  registerCustomer,
  loginCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  resetCustomerPassword
} from "../controllers/customerController.js";

const router = express.Router();

// Authentication
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

// CRUD
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

// Reset password
router.put("/:id/reset-password", resetCustomerPassword);

export default router;
