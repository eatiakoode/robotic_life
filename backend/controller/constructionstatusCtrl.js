const Constructionstatus = require("../models/constructionstatusModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createConstructionstatus = asyncHandler(async (req, res) => {
  try {
    const newConstructionstatus = await Constructionstatus.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newConstructionstatus
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateConstructionstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedConstructionstatus = await Constructionstatus.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedConstructionstatus);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteConstructionstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedConstructionstatus = await Constructionstatus.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedConstructionstatus
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getConstructionstatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaConstructionstatus = await Constructionstatus.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaConstructionstatus
    }
    res.json(message);
   //res.json(getaConstructionstatus);
  } catch (error) {
    throw new Error(error);
  }
});
const getallConstructionstatus = asyncHandler(async (req, res) => {
  try {
    const getallConstructionstatus = await Constructionstatus.find();
    res.json(getallConstructionstatus);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createConstructionstatus,
  updateConstructionstatus,
  deleteConstructionstatus,
  getConstructionstatus,
  getallConstructionstatus,
};
