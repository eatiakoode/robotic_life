const express = require("express");
const {
  createCountry,
  updateCountry,
  deleteCountry,
  getCountry,
  getallCountry,
} = require("../controller/countryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCountry);
router.put("/:id", authMiddleware, isAdmin, updateCountry);
router.delete("/:id", authMiddleware, isAdmin, deleteCountry);
router.get("/:id", getCountry);
router.get("/", getallCountry);

module.exports = router;
