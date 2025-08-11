const Propertytype = require("../../models/propertytypeModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getPropertytype = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getPropertytype = await Propertytype.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getPropertytype
    }
    res.json(message);
    // res.json(getaLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getallPropertytype = asyncHandler(async (req, res) => {
  try {
    const getallPropertytype = await Propertytype.find().populate("categoryid");
    res.json(getallPropertytype);
  } catch (error) {
    throw new Error(error);
  }
});
const getPropertytypeCategoryId = asyncHandler(async (req, res) => {
  const { categoryid } = req.params;
  validateMongoDbId(categoryid);
  try {
    const getallPropertytype = await Propertytype.find({ categoryid: categoryid });
    const message={
      "status":"success",
      "message":"Data Propertytype sucessfully",
      "data":getallPropertytype
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});
const countPropertiesByType = asyncHandler(async (req, res) => {
   try {
      const result = await Propertytype.aggregate([
        {
          $lookup: {
            from: "properties", // the collection name in MongoDB
            localField: "_id",
            foreignField: "propertytypeid",
            as: "properties"
          }
        },
        {
          $project: {
            _id: 0,
            typeId: "$_id",
            typeName: "$title",
            propertyCount: { $size: "$properties" }
          }
        }
      ]);
      
      const message={
        "status":"success",
        "message":"Data Type sucessfully",
        "data":result
      }
      res.json(message);
      // console.log(result);
    } catch (error) {
      console.error("Error counting properties by type:", error);
    }
});
module.exports = {
  getPropertytype,
  getallPropertytype,
  getPropertytypeCategoryId,
  countPropertiesByType
};
