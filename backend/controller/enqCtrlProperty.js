const EnquiryProperty = require("../models/enqModelProperty");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { enqueryPropertyMail } = require("../middlewares/enqueryMail");


const createEnquiryProperty = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await EnquiryProperty.create(req.body);
    // const emailsend  =await enqueryPropertyMail(req, res);
    const message={
      "status":"success",
      "message":"Thank you for your message. It has been sent.",
      "data":newEnquiry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiryProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiryProperty = await EnquiryProperty.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.json(updatedEnquiryProperty);
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedEnquiryProperty
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiryProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiryProperty = await EnquiryProperty.findByIdAndDelete(id);
    // res.json(deletedEnquiryProperty);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedEnquiryProperty
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiryProperty = await EnquiryProperty.findById(id);
    res.json(getaEnquiryProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiryProperty = asyncHandler(async (req, res) => {
  try {
    // const getallEnquiryProperty = await EnquiryProperty.find().populate("propertyid").lean();
    // res.json(getallEnquiryProperty);
    let limit=100;
        let skip=1;
        
    
        if (req.query.limit ) {
          limit=req.query.limit;
          skip=req.query.skip;     
        }
        
        const [EnquiryList, totalCount] = await Promise.all([
                  EnquiryProperty.find()
                    .populate("propertyid")
                    .populate("sellerid")
                    .sort({ _id: -1})
                    .skip((skip - 1) * limit)
                    .limit(limit)
                    .lean(),
                
                  EnquiryProperty.countDocuments() // total matching without skip/limit
                ]);
                res.status(200).json({
              items: EnquiryList,
              totalCount: totalCount,
              currentPage: skip,
              totalPages: Math.ceil(totalCount / limit)
            });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiryProperty,
  updateEnquiryProperty,
  deleteEnquiryProperty,
  getEnquiryProperty,
  getallEnquiryProperty,
};
