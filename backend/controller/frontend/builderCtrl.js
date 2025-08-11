const Builder = require("../../models/builderModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getBuilder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBuilder = await Builder.findById(id).lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaBuilder
    }
    res.json(message);
   //res.json(getaBuilder);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBuilder = asyncHandler(async (req, res) => {
  try {
    const getallBuilder = await Builder.find({"status":true}).lean();
    res.json(getallBuilder);
  } catch (error) {
    throw new Error(error);
  }
});
const getBuilderSlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBuilder = await Builder.findOne({slug:slug}).lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaBuilder
    }
    res.json(message);
   //res.json(getaBuilder);
  } catch (error) {
    throw new Error(error);
  }
});
const getBuilderWithProperty = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBuilder = await Builder.findOne({slug:slug}).populate("propertylist").lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaBuilder
    }
    res.json(message);
   //res.json(getaBuilder);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getBuilder,
  getallBuilder,
  getBuilderSlug,
  getBuilderWithProperty
};
