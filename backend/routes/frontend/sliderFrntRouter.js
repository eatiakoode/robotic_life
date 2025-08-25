const express = require("express");
const router = express.Router();
const { getActiveSliders} = require("../../controller/frontend/sliderFrntCtrl");

router.get("/", getActiveSliders);

module.exports = router;
