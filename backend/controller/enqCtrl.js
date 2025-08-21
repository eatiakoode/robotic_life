const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const { enqueryContactMail } = require("../middlewares/enqueryMail");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    // const emailsend  =await enqueryContactMail(req, res);
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
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": deletedEnquiry
    }
    res.json(message);
    // res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    // const getallEnquiry = await Enquiry.find();
    // res.json(getallEnquiry);
    let limit = 100;
    let skip = 1;


    if (req.query.limit) {
      limit = req.query.limit;
      skip = req.query.skip;
    }

    const [EnquiryList, totalCount] = await Promise.all([
      Enquiry.find()
        .sort({ _id: -1 })
        .skip((skip - 1) * limit)
        .limit(limit)
        .lean(),

      Enquiry.countDocuments() // total matching without skip/limit
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
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};
