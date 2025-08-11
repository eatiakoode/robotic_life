const Landingpage = require("../../models/landingpageModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getLandingpage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaLandingpage = await Landingpage.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaLandingpage
    }
    res.json(message);
   //res.json(getaLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLandingpage = asyncHandler(async (req, res) => {
  try {
    const getallLandingpage = await Landingpage.find({"status":true});
    res.json(getallLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getLandingpageSlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  // validateMongoDbId(id);
  try {
    const getaLandingpage = await Landingpage.findOne({slug:slug}).populate('paymentplan').populate("floorplan").populate("galleryimages").populate("amenityid").populate("faqid").lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaLandingpage
    }
    res.json(message);
   //res.json(getaLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getLandingpage,
  getallLandingpage,
  getLandingpageSlug
};
