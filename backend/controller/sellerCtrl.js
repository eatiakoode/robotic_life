const Seller = require("../models/sellerModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createSeller = asyncHandler(async (req, res) => {
  try {
    const newSeller = await Seller.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newSeller
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
      new: true,
    });
     const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedSeller
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedSeller = await Seller.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedSeller
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaSeller = await Seller.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaSeller
    }
    res.json(message);
   //res.json(getaSeller);
  } catch (error) {
    throw new Error(error);
  }
});
const getallSeller = asyncHandler(async (req, res) => {
  try {
    const getallSeller = await Seller.find();
    // res.json(getallSeller);
   const message={
      "status":"success",
      "message":"Get Seller list",
      "data":getallSeller
    }
    res.json(message);

  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createSeller,
  updateSeller,
  deleteSeller,
  getSeller,
  getallSeller,
};
