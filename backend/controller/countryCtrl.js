const Country = require("../models/countryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create Country
const createCountry = asyncHandler(async (req, res) => {
  try {
    const newCountry = await Country.create(req.body);
    const message = {
      "status": "success",
      "message": "Data Add sucessfully",
      "data": newCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Country
const updateCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message = {
      "status": "success",
      "message": "Data updated sucessfully",
      "data": updatedCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Country
const deleteCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);

    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": deletedCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a Country
const getCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCountry = await Country.findById(id);
    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": getaCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Countries
const getallCountry = asyncHandler(async (req, res) => {
  try {
    const getallCountry = await Country.find();
    res.json(getallCountry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCountry,
  updateCountry,
  deleteCountry,
  getCountry,
  getallCountry,
};
