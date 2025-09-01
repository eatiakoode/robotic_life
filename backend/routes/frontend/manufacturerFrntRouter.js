const express = require("express");
const router = express.Router();
const { getActiveManufacturers } = require("../../controller/frontend/manufacturerFrntCtrl");

router.get("/", getActiveManufacturers);

module.exports = router;
