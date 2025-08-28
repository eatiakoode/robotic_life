// const Property = require("../../models/propertyModel");
// const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../../utils/validateMongodbId");
// const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
// const slugify = require("slugify");
// const PropertyPage = require("../../models/propertypageModel");
// const Builder=require("../../models/builderModel")
// const { featuredImageResize,sitePlanResize,propertySelectedImgsResize } = require("../../middlewares/uploadImage");

// const getProperty = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const getProperty = await Property.findById(id).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").populate("constructionstatus").populate("furnishingstatus").populate("amenityid").lean();
//     const message={
//       "status":"success",
//       "message":"Data deleted sucessfully",
//       "data":getProperty
//     }
//     res.json(message);
//     // res.json(getaProperty);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getallPropertyList = asyncHandler(async (req, res) => {
//   try {
//     let query = {};
//     // let query ={"status":true}
//     query["status"] =true;
//     query["admin_approve"] =true;
    
//     if(req.query.featured){
//       query["featuredproperty"] = req.query.featured;      
//     }
//     if(req.query.hot){
//       query["hotproperty"] = req.query.hot;      
//     }
//     let limit=100;
//     let skip=1;

//     if (req.query.limit ) {
//       limit=req.query.limit;
//       skip=req.query.skip;     
//   }
//     const getallProperty = await Property.find(query).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").populate("sellerid").sort({createdAt: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();
//     res.json(getallProperty);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getallPropertyIdList = asyncHandler(async (req, res) => {
//   try {
  
//     const prolist = req.query.prolist;
//     const idArray = prolist.split(",");

//     const objectIds = idArray.map(id => new ObjectId(id)); // FIXED here

//     const getallProperty = await Property.find({
//       _id: { $in: objectIds }
//     }).populate("cityid").populate("propertytypeid").populate("furnishingstatus").populate("amenityid").lean();
//     res.json(getallProperty);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getallPropertyFilterList = asyncHandler(async (req, res) => {
//   try {
//     let query = {};
//     // let query ={"status":true}
//     query["status"] =true;
//     query["admin_approve"] =true;
//     if(req.query.featured){
//       query["featuredproperty"] = req.query.featured;      
//     }
//     if(req.query.hot){
//       query["hotproperty"] = req.query.hot;      
//     }
//     if(req.query.category){
//       query["categoryid"] = req.query.category;      
//     }
//     if(req.query.city){
//       query["cityid"] = req.query.city;      
//     }
//     if(req.query.propertytype){
//       query["propertytypeid"] = req.query.propertytype;      
//     }
//     if (req.query.keyword) {
//       query["$or"] = [
//         { title: { $regex: req.query.keyword, $options: "i" } },
//         { description: { $regex: req.query.keyword, $options: "i" } },
//       ];
//     }  
//     if(req.query.location){
//       query["locationid"] = req.query.location;      
//     }
    
//     let limit=100;
//     let skip=1;

//     if (req.query.limit ) {
//       limit=req.query.limit;
//       skip=req.query.skip;     
//   }
//     // const getallProperty = await Property.find(query).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").sort({updated_at: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();
//     const [propertyList, totalCount] = await Promise.all([
//       Property.find(query)
//         .populate("cityid")
//         .populate("categoryid")
//         .populate("propertytypeid")
//         .populate("locationid")
//         .populate("sellerid")
//         .sort({ _id: -1})
//         .skip((skip - 1) * limit)
//         .limit(limit)
//         .lean(),
    
//       Property.countDocuments(query) // total matching without skip/limit
//     ]);
//     // propertyList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//     res.status(200).json({
//       items: propertyList,
//       totalCount: totalCount,
//       currentPage: skip,
//       totalPages: Math.ceil(totalCount / limit)
//     });
//     // res.json(getallProperty);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getPropertySlug = asyncHandler(async (req, res) => {
//   const { slug } = req.params;
//   // validateMongoDbId(slug);
//   try {
//     const getProperty = await Property.findOne({ slug: slug }).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").populate("constructionstatus").populate("furnishingstatus").populate("amenityid").populate('images').populate("floorplan").populate("builderid").populate("sellerid").lean();
//     const message={
//       "status":"success",
//       "message":"Data deleted sucessfully",
//       "data":getProperty
//     }
//     res.json(message);
//     // res.json(getaProperty);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const createProperty = asyncHandler(async (req, res) => {
//   try {
//     if (req.files && Object.keys(req.files).length > 0) {
      
//       if (req.files && req.files.propertySelectedImgs && req.files.propertySelectedImgs.length > 0  && Object.keys(req.files.propertySelectedImgs).length > 0 && Array.isArray(req.files.propertySelectedImgs)) {
//         console.log("no propertySelectedImgs")
//         const propertySelectedImgs  = await propertySelectedImgsResize(req);
//         if (propertySelectedImgs.length > 0) {
//           // ✅ Append logo filename to req.body
//           // console.log("Property Images:", propertySelectedImgs);
//           req.body.propertyimageurl = propertySelectedImgs;
//         }
//       }
     
//       if (req.files && req.files.featuredimage && Array.isArray(req.files.featuredimage) && req.files.featuredimage.length > 0 ) { 
//         console.log(req.files.featuredimage)
//         console.log("no featuredImageResize")
//         const processedImages  =await featuredImageResize(req);
//         if (processedImages.length > 0) {
//           // ✅ Append logo filename to req.body
//           req.body.featuredimageurl = "public/images/property/"+processedImages[0];
//         }
//       }
//       if (req.files && req.files.siteplan && Array.isArray(req.files.siteplan) && req.files.siteplan.length > 0 ) { 
        
//         console.log(req.files.siteplan)
//         console.log("no siteplan")
//         const processedImagesplan  =await sitePlanResize(req);

//         if (processedImagesplan.length > 0) {
//           // ✅ Append logo filename to req.body
//           req.body.siteplanurl = "public/images/propertyplan/"+processedImagesplan[0];
//         }
//       }
//     }

//     if (req.body.amenityid && typeof req.body.amenityid === "string") {
//       req.body.amenityid = req.body.amenityid
//         .split(",")
//         .map((id) => new mongoose.Types.ObjectId(id.trim()));
//     }
//     req.body.slug  = slugify(req.body.slug.toLowerCase());
//     req.body.admin_approve = false;

//     const newProperty = await Property.create(req.body);
//     //res.json(newProperty);
//     const message={
//       "status":"success",
//       "message":"Data Add sucessfully",
//       "data":newProperty
//     }
//     res.json(message);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const propertyListByPage = asyncHandler(async (req, res) => {
//   try {
//     const { slug } = req.params;
//      const getaPropertyPage = await PropertyPage.findOne({ slug: slug }).lean();
//     let query = {};
//     // let query ={"status":true}
//     query["status"] =true;
//     query["admin_approve"] =true;
//     // if(req.query.featured=="yes"){
//     //   query["featuredproperty"] = req.query.featured;      
//     // }
//     // if(req.query.hot=="yes"){
//     //   query["hotproperty"] = req.query.hot;      
//     // }
//     if(getaPropertyPage.categoryid){
//       query["categoryid"] = getaPropertyPage.categoryid;      
//     }
//     if(getaPropertyPage.cityid){
//       query["cityid"] = getaPropertyPage.cityid;      
//     }
//     if(getaPropertyPage.propertytypeid){
//       query["propertytypeid"] = getaPropertyPage.propertytypeid;      
//     }
//     if(getaPropertyPage.locationid){
//       query["locationid"] = getaPropertyPage.locationid;      
//     }
    
//     let limit=100;
//     let skip=1;

//     if (req.query.limit ) {
//       limit=req.query.limit;
//       skip=req.query.skip;     
//   }
//     // const getallProperty = await Property.find(query).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").sort({updated_at: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();
//     const [propertyList, totalCount] = await Promise.all([
//       Property.find(query)
//         .populate("cityid")
//         .populate("categoryid")
//         .populate("propertytypeid")
//         .populate("locationid")
//         .populate("sellerid")
//         .sort({createdAt: -1})
//         .skip((skip - 1) * limit)
//         .limit(limit)
//         .lean(),
    
//       Property.countDocuments(query) // total matching without skip/limit
//     ]);
//     res.status(200).json({
//       items: propertyList,
//       totalCount: totalCount,
//       currentPage: skip,
//       totalPages: Math.ceil(totalCount / limit)
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const propertyListTrends = asyncHandler(async (req, res) => {
//   try {
//     let query = {
//       status: true,
//       admin_approve: true,
//     };
    
//     if (req.query.propertytypeid) {
//       query.propertytypeid =new mongoose.Types.ObjectId(req.query.propertytypeid);
//     }
    
//     if (req.query.categoriesid) {
//       query.categoryid = new mongoose.Types.ObjectId(req.query.categoriesid);
//     }
//     console.log(query)
//     const result = await Property.aggregate([
//       {
//         $match: query,
//       },
//       {
//         $addFields: {
//           priceNumeric: { $toDouble: "$pricesqft" }, // convert price string to number
//         },
//       },
//       {
//         $group: {
//           _id: "$locationid",
//           propertyCount: { $sum: 1 },
//           avgPrice: { $avg: "$priceNumeric" },
//           minPrice: { $min: "$priceNumeric" },
//           maxPrice: { $max: "$priceNumeric" },
//         },
//       },
//       {
//         $lookup: {
//           from: "locations", // collection name in lowercase and plural
//           localField: "_id",
//           foreignField: "_id",
//           as: "locationDetails",
//         },
//       },
//       {
//         $unwind: "$locationDetails",
//       },
//       {
//         $project: {
//           locationId: "$_id",
//           locationTitle: "$locationDetails.title",
//           propertyCount: 1,
//           avgPrice: 1,
//           minPrice: 1,
//           maxPrice: 1,
//         },
//       },
//     ]);
//     const message={
//       "status":"success",
//       "message":"Data Add sucessfully",
//       "data":result
//     }
//     res.json(message);
//     // return result;
    
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const propertyListByBuilder = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     //  const getaPropertyPage = await Builder.findOne({ slug: slug }).lean();
//     let query = {};
//     // let query ={"status":true}
//     query["status"] =true;
//     query["admin_approve"] =true;
    
    
//     if(id){
//       query["builderid"] = id;      
//     }
    
//     let limit=100;
//     let skip=1;

//     if (req.query.limit ) {
//       limit=req.query.limit;
//       skip=req.query.skip;     
//   }
//     // const getallProperty = await Property.find(query).populate("cityid").populate("categoryid").populate("propertytypeid").populate("locationid").sort({updated_at: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();
//     const [propertyList, totalCount] = await Promise.all([
//       Property.find(query)
//         .populate("cityid")
//         .populate("categoryid")
//         .populate("propertytypeid")
//         .populate("locationid")
//         .populate("sellerid")
//         .sort({createdAt: -1})
//         .skip((skip - 1) * limit)
//         .limit(limit)
//         .lean(),
    
//       Property.countDocuments(query) // total matching without skip/limit
//     ]);
//     res.status(200).json({
//       items: propertyList,
//       totalCount: totalCount,
//       currentPage: skip,
//       totalPages: Math.ceil(totalCount / limit)
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// module.exports = {
//   getProperty,
//   getallPropertyList,
//   getallPropertyIdList,
//   getallPropertyFilterList,
//   getPropertySlug,
//   createProperty,
//   propertyListByPage,
//   propertyListTrends,
//   propertyListByBuilder
// };
