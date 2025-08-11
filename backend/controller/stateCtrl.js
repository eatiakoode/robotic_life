const State = require("../models/stateModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createState = asyncHandler(async (req, res) => {
  try {
    const newState = await State.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newState
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateState = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedState = await State.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedState
    }
    res.json(message);
    // res.json(updatedState);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteState = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedState = await State.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedState
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getState = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getState = await State.findById(id);
    const message={
      "status":"success",
      "message":"Data city sucessfully",
      "data":getState
    }
    res.json(message);
   //res.json(getState);
  } catch (error) {
    throw new Error(error);
  }
});
const getallState = asyncHandler(async (req, res) => {
  try {
    const getallState = await State.find().populate("countryid");
    res.json(getallState);
  } catch (error) {
    throw new Error(error);
  }
});
const getStateCountryId = asyncHandler(async (req, res) => {
  const { countryid } = req.params;
  validateMongoDbId(countryid);
  try {
    const getallState = await State.find({ countryid: countryid });
    const message={
      "status":"success",
      "message":"Data State sucessfully",
      "data":getallState
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createState,
  updateState,
  deleteState,
  getState,
  getallState,
  getStateCountryId
};
