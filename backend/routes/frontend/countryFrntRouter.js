const express = require("express");
const router = express.Router();
const { getallCountry } = require("../../controller/countryCtrl");

// Get all countries for frontend
router.get("/", getallCountry);

module.exports = router;
