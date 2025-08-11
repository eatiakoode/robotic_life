const Agent = require("../models/agentModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createAgent = asyncHandler(async (req, res) => {
  try {
    const newAgent = await Agent.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newAgent
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAgent);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedAgent = await Agent.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedAgent
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getAgent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaAgent = await Agent.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaAgent
    }
    res.json(message);
   //res.json(getaAgent);
  } catch (error) {
    throw new Error(error);
  }
});
const getallAgent = asyncHandler(async (req, res) => {
  try {
    const getallAgent = await Agent.find();
    res.json(getallAgent);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createAgent,
  updateAgent,
  deleteAgent,
  getAgent,
  getallAgent,
};
