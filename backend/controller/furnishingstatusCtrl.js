const Furnishingstatus = require("../models/furnishingstatusModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createFurnishingstatus = asyncHandler(async (req, res) => {
  try {
    const newFurnishingstatus = await Furnishingstatus.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newFurnishingstatus
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateFurnishingstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedFurnishingstatus = await Furnishingstatus.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedFurnishingstatus);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteFurnishingstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedFurnishingstatus = await Furnishingstatus.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedFurnishingstatus
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getFurnishingstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaFurnishingstatus = await Furnishingstatus.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaFurnishingstatus
    }
    res.json(message);
   //res.json(getaFurnishingstatus);
  } catch (error) {
    throw new Error(error);
  }
});
const getallFurnishingstatus = asyncHandler(async (req, res) => {
  try {
    const getallFurnishingstatus = await Furnishingstatus.find();
    res.json(getallFurnishingstatus);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createFurnishingstatus,
  updateFurnishingstatus,
  deleteFurnishingstatus,
  getFurnishingstatus,
  getallFurnishingstatus,
};
