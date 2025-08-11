const Location = require("../../models/locationModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId.js");


const getLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaLocation = await Location.findById(id).lean();
    res.json(getaLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLocation = asyncHandler(async (req, res) => {
  try {
    let query = {};
    // let query ={"status":true}
    query["status"] =true;
    
    if(req.query.istrending=="yes"){
      query["istrending"] = req.query.istrending;      
    }
    let limit=100;
    let skip=1;

    if (req.query.limit ) {
      limit=req.query.limit;
      skip=req.query.skip;     
    }
    const getallLocation = await Location.find(query).populate('cityid').skip((skip - 1) * limit).limit(parseInt(limit)).lean();
    res.json(getallLocation);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getLocation,
  getallLocation,
};
