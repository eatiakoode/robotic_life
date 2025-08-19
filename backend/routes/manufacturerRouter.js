const express = require("express");
const {
    createManufacturer,
    getManufacturers,
    getManufacturerById,
    updateManufacturer,
    deleteManufacturer
} = require("../controller/manufacturerCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();

// Create Manufacturer
router.post("/", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), createManufacturer);

// Get all Manufacturers
router.get("/", authMiddleware, isAdmin, getManufacturers);

// Get Manufacturer by ID
router.get("/:id", authMiddleware, isAdmin, getManufacturerById);

// Update Manufacturer (support multipart logo updates)
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), updateManufacturer);

// Delete Manufacturer
router.delete("/:id", authMiddleware, isAdmin, deleteManufacturer);

module.exports = router;