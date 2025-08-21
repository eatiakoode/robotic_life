const EnquiryBrochure = require("../models/enqBrochureModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { enqueryBrochureMail } = require("../middlewares/enqueryMail");


const createEnquiryBrochure = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await EnquiryBrochure.create(req.body);
    // const emailsend  =await enqueryBrochureMail(req, res);
    const message = {
      "status": "success",
      "message": "Thank you for your message. It has been sent.",
      "data": newEnquiry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiryBrochure = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiryBrochure = await EnquiryBrochure.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiryBrochure);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiryBrochure = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiryBrochure = await EnquiryBrochure.findByIdAndDelete(id);
    // res.json(deletedEnquiryBrochure);
    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": deletedEnquiryBrochure
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryBrochure = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiryBrochure = await EnquiryBrochure.findById(id);
    res.json(getaEnquiryBrochure);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiryBrochure = asyncHandler(async (req, res) => {
  try {
    // const getallEnquiryBrochure = await EnquiryBrochure.find().populate("propertyid").lean();
    // res.json(getallEnquiryBrochure);
    let limit = 100;
    let skip = 1;


    if (req.query.limit) {
      limit = req.query.limit;
      skip = req.query.skip;
    }

    const [EnquiryList, totalCount] = await Promise.all([
      EnquiryBrochure.find()
        .populate("propertyid")
        .sort({ _id: -1 })
        .skip((skip - 1) * limit)
        .limit(limit)
        .lean(),

      EnquiryBrochure.countDocuments() // total matching without skip/limit
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
  createEnquiryBrochure,
  updateEnquiryBrochure,
  deleteEnquiryBrochure,
  getEnquiryBrochure,
  getallEnquiryBrochure,
};
