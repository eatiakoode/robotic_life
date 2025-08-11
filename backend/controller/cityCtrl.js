const City = require("../models/cityModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { cityImgResize } = require("../middlewares/uploadImage");

const createCity = asyncHandler(async (req, res) => {
  try {
    
    if(req.files){
      const processedImages  =await cityImgResize(req);
      // console.log("processedImages")
      // console.log(processedImages)
      if (processedImages.length > 0) {
        // ✅ Append logo filename to req.body
        req.body.citylogoimage = "public/images/city/"+processedImages[0];
      }
    }
    // if (req.files && Object.keys(req.files).length > 0) {      
    //   if (req.files && req.files.citylogo && req.files.citylogo.length > 0  && Object.keys(req.files.citylogo).length > 0 && Array.isArray(req.files.citylogo)) {        
    //   const processedImages  =await cityImgResize(req);
    //   console.log("req.files.citylogo req.body.citylogoimage")
    //     if (processedImages.length > 0) {
    //       req.body.citylogoimage = "public/images/city/"+processedImages[0];
    //     }
    //   }
    // }
    // console.log("processedImages")
    // console.log(processedImages)

    const newCity = await City.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newCity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if(req.files){
      const processedImages  =await cityImgResize(req);
      // console.log("processedImages")
      // console.log(processedImages)
      if (processedImages.length > 0) {
        // ✅ Append logo filename to req.body
        req.body.citylogoimage = "public/images/city/"+processedImages[0];
      }
    }
    const updatedCity = await City.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedCity
    }
    res.json(message);
    // res.json(updatedCity);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCity = await City.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedCity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCity = await City.findById(id).populate("cityglimpse");
    const message={
      "status":"success",
      "message":"Data city sucessfully",
      "data":getaCity
    }
    res.json(message);
   //res.json(getaCity);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCity = asyncHandler(async (req, res) => {
  try {
    const getallCity = await City.find().populate("countryid").populate("stateid");
    res.json(getallCity);
  } catch (error) {
    throw new Error(error);
  }
});
const getCityStateId = asyncHandler(async (req, res) => {
  const { stateid } = req.params;
  validateMongoDbId(stateid);
  try {
    const getallState = await City.find({ stateid: stateid });
    const message={
      "status":"success",
      "message":"Data City sucessfully",
      "data":getallState
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCity,
  updateCity,
  deleteCity,
  getCity,
  getallCity,
  getCityStateId
};
