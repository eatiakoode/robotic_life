const Propertyplan = require("../models/propertyfloorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const mongoose = require("mongoose");
const slugify = require("slugify");
const { processFloorPlanImages,processFloorPlanImagesGet } = require("../middlewares/uploadImage");
const fs = require("fs");


const createPropertyplan = asyncHandler(async (req, res) => {
  try {
    for(var i=0;i<req.body.floorPlans?.length;i++){
      
        var plandata={
            "title":req.body.floorPlans[i].title,
            "bedroom":req.body.floorPlans[i].bedroom,
            "price":req.body.floorPlans[i].price,
            "areasize":req.body.floorPlans[i].areasize,
            "description":req.body.floorPlans[i].description,
            "propertyid":req.body.propertyId
        }
        const floorPlans = [];

    // Parse text fields like floorPlans[0][title], etc.
    Object.entries(req.body).forEach(([key, value]) => {
      const match = key.match(/^floorPlans\[(\d+)]\[(\w+)]$/);
      if (match) {
        const [ , index, field ] = match;
        if (!floorPlans[index]) floorPlans[index] = {};
        floorPlans[index][field] = value;
      }
    });

    // Parse uploaded files with fieldnames like floorPlans[0][planimage]
    (req.files || []).forEach((file) => {
      const match = file.fieldname.match(/^floorPlans\[(\d+)]\[planimage]$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!floorPlans[index]) floorPlans[index] = {};
        floorPlans[index].planimage = file;
      }
    });
    console.log("floorPlans floorPlans")
    console.log(floorPlans)
    // Now process each floor plan image
    for (let i = 0; i < floorPlans.length; i++) {
      const plan = floorPlans[i];

      if (plan) {
        console.log("Resizing image for floorPlan", i);
        console.log("plan", plan);

        const processedImages = await processFloorPlanImages(plan); // assuming this accepts a single file
        if (processedImages.length > 0) {
            plandata.planimageurl = `${processedImages[0].url}`;
        }
      }
    }
        console.log("plandata plandata")
        console.log(plandata)
        const newPropertyplan = await Propertyplan.create(plandata);
      }
    
      for(var i=0;i<req.body.floorPlansget?.length;i++){
        var plandata={
            "title":req.body.floorPlansget[i].title,
            "bedroom":req.body.floorPlansget[i].bedroom,
            "price":req.body.floorPlansget[i].price,
            "areasize":req.body.floorPlansget[i].areasize,
            "description":req.body.floorPlansget[i].description,
            "propertyid":req.body.propertyId
        }
       

        const floorPlansget = [];

        // Parse text fields like floorPlans[0][title], etc.
        Object.entries(req.body).forEach(([key, value]) => {
          const match = key.match(/^floorPlansget\[(\d+)]\[(\w+)]$/);
          if (match) {
            const [ , index, field ] = match;
            if (!floorPlansget[index]) floorPlansget[index] = {};
            floorPlansget[index][field] = value;
          }
        });
    
        // Parse uploaded files with fieldnames like floorPlans[0][planimage]
        (req.files || []).forEach((file) => {
          const match = file.fieldname.match(/^floorPlansget\[(\d+)]\[planimageget]$/);
          if (match) {
            const index = parseInt(match[1]);
            if (!floorPlansget[index]) floorPlansget[index] = {};
            floorPlansget[index].planimageget = file;
          }
        });
        // console.log("floorPlans floorPlans")
        // console.log(floorPlans)
        // Now process each floor plan image
        // for (let i = 0; i < floorPlansget.length; i++) {
          const plan = floorPlansget[i];
    
          if (plan && plan.planimageget) {
        //     console.log("Resizing image for floorPlan", i);
        // console.log("plan", plan);
    
            const processedImages = await processFloorPlanImagesGet(plan); // assuming this accepts a single file
            if (processedImages.length > 0) {
                plandata.planimageurl = `${processedImages[0].url}`;
            }
          }
        // }
        console.log("plan", req.body.floorPlansget[i].planid, plandata);

        const updatedPropertyplan = await Propertyplan.findByIdAndUpdate(req.body.floorPlansget[i].planid, plandata, {
            new: true,
          });
    }
    //res.json(newProperty);
    const message={
      "status":"success",
      "message":"Floor Plan Data Updated sucessfully",
    //   "data":newPropertyplan
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePropertyplan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    const updatedPropertyplan = await Propertyplan.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedPropertyplan
    }
    res.json(message);
    // res.json(updatedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePropertyplan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedPropertyplan = await Propertyplan.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedPropertyplan
    }
    res.json(message);
    // res.json(deletedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getPropertyplan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getPropertyplan = await Propertyplan.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getPropertyplan
    }
    res.json(message);
    // res.json(getaPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallPropertyplan = asyncHandler(async (req, res) => {
  try {
    const getallPropertyplan = await Propertyplan.find().populate("cityid").populate("categoryid");
    res.json(getallPropertyplan);
  } catch (error) {
    throw new Error(error);
  }
});

const imageDeletePropertyPlan = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // validateMongoDbId(id);
  try {
    // console.log("Body:", req.body);

    const id = req.body.planid;
    const fieldName = req.body.fieldname;
    const imagePath = req.body.imageurl;
    if (!id || !fieldName || !imagePath) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedData = {
      [fieldName]: ''
    };
    const updatedProperty = await Propertyplan.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const message={
      "status":"success",
      "message":"Data deleted sucessfully image",
      "data":updatedProperty
    }
    res.json(message);
    // res.json(getaProperty);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
createPropertyplan,
  updatePropertyplan,
  deletePropertyplan,
  getPropertyplan,
  getallPropertyplan,
  imageDeletePropertyPlan
};
