const express = require("express");
const router = express.Router();

const {
  createEnquiry,
} = require("../../controller/frontend/enqCtrl");

router.post("/", createEnquiry);

module.exports = router;
