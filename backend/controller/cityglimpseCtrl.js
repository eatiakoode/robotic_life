const Cityglimpse = require("../models/cityglimpseModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const mongoose = require("mongoose");
const slugify = require("slugify");
const City = require("../models/cityModel");


const createCityglimpse = asyncHandler(async (req, res) => {
  try {
    // console.log("req.body.CityGlimpse")
    // console.log(req.body.CityGlimpse)
    // console.log(req.body.description)
    const citydetail={
        "description":req.body.description
    }
    const updatedCityd = await City.findByIdAndUpdate(req.body.cityId, citydetail, {
            new: true,
          });
    for(var i=0;i<req.body.CityGlimpse?.length;i++){
      
        var plandata={
            "title":req.body.CityGlimpse[i].title,
            "description":req.body.CityGlimpse[i].description,
            "cityid":req.body.cityId
        }
        const CityGlimpse = [];

    // Parse text fields like CityGlimpse[0][title], etc.
    // Object.entries(req.body).forEach(([key, value]) => {
    //   const match = key.match(/^CityGlimpse\[(\d+)]\[(\w+)]$/);
    //   if (match) {
    //     const [ , index, field ] = match;
    //     if (!CityGlimpse[index]) CityGlimpse[index] = {};
    //     CityGlimpse[index][field] = value;
    //   }
    // });

    // Parse uploaded files with fieldnames like CityGlimpse[0][planimage]
    // (req.files || []).forEach((file) => {
    //   const match = file.fieldname.match(/^CityGlimpse\[(\d+)]\[planimage]$/);
    //   if (match) {
    //     const index = parseInt(match[1]);
    //     if (!CityGlimpse[index]) CityGlimpse[index] = {};
    //     CityGlimpse[index].planimage = file;
    //   }
    // });
    // console.log("CityGlimpse CityGlimpse")
    // console.log(CityGlimpse)
    // Now process each floor plan image
    // for (let i = 0; i < CityGlimpse.length; i++) {
    //   const plan = CityGlimpse[i];

    //   if (plan) {
    //     console.log("Resizing image for floorPlan", i);

        
    //   }
    // }
        console.log("plandata plandata")
        console.log(plandata)
        const newCityglimpse = await Cityglimpse.create(plandata);
      }
    
      for(var i=0;i<req.body.CityGlimpseget?.length;i++){
        var plandata={
            "title":req.body.CityGlimpseget[i].title,
            "description":req.body.CityGlimpseget[i].description,
            "cityid":req.body.cityId
        }
       

        // const CityGlimpseget = [];

        // Parse text fields like CityGlimpse[0][title], etc.
        // Object.entries(req.body).forEach(([key, value]) => {
        //   const match = key.match(/^CityGlimpseget\[(\d+)]\[(\w+)]$/);
        //   if (match) {
        //     const [ , index, field ] = match;
        //     if (!CityGlimpseget[index]) CityGlimpseget[index] = {};
        //     CityGlimpseget[index][field] = value;
        //   }
        // });
    
        // Parse uploaded files with fieldnames like CityGlimpse[0][planimage]
        // (req.files || []).forEach((file) => {
        //   const match = file.fieldname.match(/^CityGlimpseget\[(\d+)]\[planimageget]$/);
        //   if (match) {
        //     const index = parseInt(match[1]);
        //     if (!CityGlimpseget[index]) CityGlimpseget[index] = {};
        //     CityGlimpseget[index].planimageget = file;
        //   }
        // });
        // console.log("CityGlimpse CityGlimpse")
        // console.log(CityGlimpse)
        // Now process each floor plan image
        // for (let i = 0; i < CityGlimpseget.length; i++) {
        //   const plan = CityGlimpseget[i];
    
        //   if (plan) {
        //     console.log("Resizing image for floorPlan", i);
    
        //     const processedImages = await processFloorPlanImagesGet(plan); // assuming this accepts a single file
        //     if (processedImages.length > 0) {
        //         plandata.planimageurl = `${processedImages[0].url}`;
        //     }
        //   }
        // }

        const updatedCityglimpse = await Cityglimpse.findByIdAndUpdate(req.body.CityGlimpseget[i].glimpseid, plandata, {
            new: true,
          });
    }
    //res.json(newProperty);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
    //   "data":newCityglimpse
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCityglimpse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    const updatedCityglimpse = await Cityglimpse.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedCityglimpse
    }
    res.json(message);
    // res.json(updatedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCityglimpse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCityglimpse = await Cityglimpse.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedCityglimpse
    }
    res.json(message);
    // res.json(deletedPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getCityglimpse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCityglimpse = await Cityglimpse.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getCityglimpse
    }
    res.json(message);
    // res.json(getaPropertypage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCityglimpse = asyncHandler(async (req, res) => {
  try {
    const getallCityglimpse = await Cityglimpse.find().populate("cityid").populate("categoryid");
    res.json(getallCityglimpse);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
createCityglimpse,
  updateCityglimpse,
  deleteCityglimpse,
  getCityglimpse,
  getallCityglimpse,
};
