const Amenity = require("../models/amenityModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { uploadPhoto, amenityImgResize } = require("../middlewares/uploadImage");

const createAmenity = asyncHandler(async (req, res) => {
  try {
    if(req.files){
      const processedImages  =await amenityImgResize(req);
      if (processedImages.length > 0) {
        // ✅ Append logo filename to req.body
        req.body.image = "public/images/amenity/"+processedImages[0];
      }
    }
    const newAmenity = await Amenity.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newAmenity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAmenity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if(req.files){
      const processedImages  =await amenityImgResize(req);
      if (processedImages.length > 0) {
        // ✅ Append logo filename to req.body
        req.body.image = "public/images/amenity/"+processedImages[0];
      }
    }
    const updatedAmenity = await Amenity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.json(updatedAmenity);
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedAmenity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAmenity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedAmenity = await Amenity.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedAmenity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getAmenity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAmenity = await Amenity.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getAmenity
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getallAmenity = asyncHandler(async (req, res) => {
  try {
     let limit=100;
            let skip=1;
            
        
            if (req.query.limit ) {
              limit=req.query.limit;
              skip=req.query.skip;     
          }
           
            const [amenityList, totalCount] = await Promise.all([
                      Amenity.find()
                        .sort({ _id: -1})
                        .skip((skip - 1) * limit)
                        .limit(limit)
                        .lean(),
                    
                      Amenity.countDocuments() // total matching without skip/limit
                    ]);
                    res.status(200).json({
                  items: amenityList,
                  totalCount: totalCount,
                  currentPage: skip,
                  totalPages: Math.ceil(totalCount / limit)
                });
    // const getallAmenity = await Amenity.find();
    // res.json(getallAmenity);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createAmenity,
  updateAmenity,
  deleteAmenity,
  getAmenity,
  getallAmenity,
};
