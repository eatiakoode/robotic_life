const express = require("express");
const {
  createPropertytype,
  updatePropertytype,
  deletePropertytype,
  getPropertytype,
  getallPropertytype,
  getPropertytypeCategoryId,
} = require("../controller/propertytypeCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createPropertytype);
router.put("/:id", authMiddleware, isAdmin, updatePropertytype);
router.delete("/:id", authMiddleware, isAdmin, deletePropertytype);
router.get("/byid/:id", getPropertytype);
router.get("/", getallPropertytype);
router.get("/bycategory/:categoryid", getPropertytypeCategoryId);

module.exports = router;
