const Landingimages = require("../models/landingimagesModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const mongoose = require("mongoose");

const createLandingimages = asyncHandler(async (req, res) => {
  try {
     const newLandingimages = await Landingimages.create(req.body);
     
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newLandingimages
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLandingimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    
    const updatedLandingimages = await Landingimages.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedLandingimages
    }
    res.json(message);
    // res.json(updatedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLandingimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedLandingimages = await Landingimages.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedLandingimages
    }
    res.json(message);
    // res.json(deletedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getLandingimages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getLandingimages = await Landingimages.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getLandingimages
    }
    res.json(message);
    // res.json(getaLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLandingimages = asyncHandler(async (req, res) => {
  try {
    const getallLandingimages = await Landingimages.find().populate("cityid").populate("categoryid");
    res.json(getallLandingimages);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createLandingimages,
  updateLandingimages,
  deleteLandingimages,
  getLandingimages,
  getallLandingimages,
};
