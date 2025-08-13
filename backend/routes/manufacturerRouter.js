const express = require("express");
const {
  createManufacturer,
  getManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer
} = require("../controller/manufacturerCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create Manufacturer
router.post("/", authMiddleware, isAdmin, createManufacturer);

// Get all Manufacturers
router.get("/", authMiddleware, isAdmin, getManufacturers);

// Get Manufacturer by ID
router.get("/:id", authMiddleware, isAdmin, getManufacturerById);

// Update Manufacturer
router.put("/:id", authMiddleware, isAdmin, updateManufacturer);

// Delete Manufacturer
router.delete("/:id", authMiddleware, isAdmin, deleteManufacturer);

module.exports = router;