const express = require("express");
const {
  createFaq,
  updateFaq,
  deleteFaq,
  getFaq,
  getallFaq,
} = require("../controller/faqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin,
 createFaq);
router.put("/:id", authMiddleware, isAdmin, updateFaq);
router.delete("/:id", authMiddleware, isAdmin, deleteFaq);
router.get("/:id", getFaq);
router.get("/", getallFaq);

module.exports = router;
