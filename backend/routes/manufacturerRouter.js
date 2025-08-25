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

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), createManufacturer);
router.get("/",   getManufacturers);
router.get("/:id", authMiddleware, isAdmin, getManufacturerById);
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("logo", 10), updateManufacturer);
router.delete("/:id", authMiddleware, isAdmin, deleteManufacturer);

module.exports = router;