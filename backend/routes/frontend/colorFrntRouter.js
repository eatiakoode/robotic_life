const express = require("express");
const router = express.Router();
const { getActiveColors } = require("../../controller/frontend/colorFrntCtrl");

router.get("/", getActiveColors);

module.exports = router;
