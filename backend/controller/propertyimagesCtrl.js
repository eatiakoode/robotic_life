const Propertyimages = require("../models/propertyimagesModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const mongoose = require("mongoose");

const createPropertyimages = asyncHandler(async (req, res) => {
  try {
    
     const newPropertyimages = await Propertyimages.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newPropertyimages
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePropertyimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
   
    const updatedPropertyimages = await Propertyimages.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedPropertyimages
    }
    res.json(message);
    // res.json(updatedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePropertyimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedPropertyimages = await Propertyimages.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedPropertyimages
    }
    res.json(message);
    // res.json(deletedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getPropertyimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getPropertyimages = await Propertyimages.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getPropertyimages
    }
    res.json(message);
    // res.json(getaPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallPropertyimages = asyncHandler(async (req, res) => {
  try {
    const getallPropertyimages = await Propertyimages.find().populate("cityid").populate("categoryid");
    res.json(getallPropertyimages);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createPropertyimages,
  updatePropertyimages,
  deletePropertyimages,
  getPropertyimages,
  getallPropertyimages,
};
