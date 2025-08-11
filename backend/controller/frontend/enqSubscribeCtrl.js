const EnquirySubscribe = require("../../models/enqSubscribeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const { enquerySubscribeMail } = require("../../middlewares/enqueryMail");


const createEnquirySubscribe = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await EnquirySubscribe.create(req.body);
    const emailsend  =await enquerySubscribeMail(req, res);
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
const updateEnquirySubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquirySubscribe = await EnquirySubscribe.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquirySubscribe);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquirySubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquirySubscribe = await EnquirySubscribe.findByIdAndDelete(id);
    res.json(deletedEnquirySubscribe);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquirySubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquirySubscribe = await EnquirySubscribe.findById(id);
    res.json(getaEnquirySubscribe);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquirySubscribe = asyncHandler(async (req, res) => {
  try {
    const getallEnquirySubscribe = await EnquirySubscribe.find();
    res.json(getallEnquirySubscribe);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquirySubscribe,
  updateEnquirySubscribe,
  deleteEnquirySubscribe,
  getEnquirySubscribe,
  getallEnquirySubscribe,
};
