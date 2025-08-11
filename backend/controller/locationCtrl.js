const Location = require("../models/locationModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { locationImgResize } = require("../middlewares/uploadImage");

const createLocation = asyncHandler(async (req, res) => {
  try {
     if(req.files){
        const processedImages  =await locationImgResize(req);
        if (processedImages.length > 0) {
          req.body.locationlogoimage = "public/images/location/"+processedImages[0];
        }
      }
    const newLocation = await Location.create(req.body);
    //res.json(newLocation);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newLocation
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if(req.files){
      const processedImages  =await locationImgResize(req);
      if (processedImages.length > 0) {
        req.body.locationlogoimage = "public/images/location/"+processedImages[0];
      }
    }
    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.json(updatedLocation);
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedLocation
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedLocation = await Location.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedLocation
    }
    res.json(message);
    // res.json(deletedLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getLocation = await Location.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getLocation
    }
    res.json(message);
    // res.json(getaLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLocation = asyncHandler(async (req, res) => {
  try {
    let limit=100;
                let skip=1;
                
            
                if (req.query.limit ) {
                  limit=req.query.limit;
                  skip=req.query.skip;     
              }
               
                const [LocationList, totalCount] = await Promise.all([
                          Location.find()
                            .sort({ _id: -1})
                            .skip((skip - 1) * limit)
                            .limit(limit)
                            .lean(),
                        
                          Location.countDocuments() // total matching without skip/limit
                        ]);
                        res.status(200).json({
                      items: LocationList,
                      totalCount: totalCount,
                      currentPage: skip,
                      totalPages: Math.ceil(totalCount / limit)
                    });
    // const getallLocation = await Location.find().populate("cityid");
    // res.json(getallLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getLocationCityId = asyncHandler(async (req, res) => {
  const { cityid } = req.params;
  validateMongoDbId(cityid);
  try {
    const getallLocation = await Location.find({ cityid: cityid });
    const message={
      "status":"success",
      "message":"Data Location sucessfully",
      "data":getallLocation
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
  getallLocation,
  getLocationCityId
};
