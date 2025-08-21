// const PropertyPage = require("../../models/propertypageModel");
// const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../../utils/validateMongodbId");

// const getPropertyPage = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const getaPropertyPage = await PropertyPage.findById(id).populate("cityid").lean();
//     const message={
//       "status":"success",
//       "message":"Data deleted sucessfully",
//       "data":getaPropertyPage
//     }
//     res.json(message);
//    //res.json(getaBlog);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getallPropertyPage = asyncHandler(async (req, res) => {
//   try {
//     const getallPropertyPage = await PropertyPage.find({"status":true}).populate("cityid").lean();
//     res.json(getallPropertyPage);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getPropertyPageSlug = asyncHandler(async (req, res) => {
//   const { slug } = req.params;
//   // validateMongoDbId(id);
//   try {
//     const getaPropertyPage = await PropertyPage.findOne({slug:slug}).populate("cityid").lean();
//     const message={
//       "status":"success",
//       "message":"Data deleted sucessfully",
//       "data":getaPropertyPage
//     }
//     res.json(message);
//    //res.json(getaPropertyPage);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// module.exports = {
//   getPropertyPage,
//   getallPropertyPage,
//   getPropertyPageSlug
// };
