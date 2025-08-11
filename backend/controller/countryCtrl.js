const Country = require("../models/countryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCountry = asyncHandler(async (req, res) => {
  try {
    const newCountry = await Country.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.json(updatedCountry);
     const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedCountry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getCountry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCountry = await Country.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaCountry
    }
    res.json(message);
   //res.json(getaCountry);
  } catch (error) {
    throw new Error(error);
  }
});
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
