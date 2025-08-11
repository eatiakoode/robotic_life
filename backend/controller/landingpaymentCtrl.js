const Landingpayment = require("../models/landingfloorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const mongoose = require("mongoose");
const slugify = require("slugify");
const { processFloorPaymentImages,processFloorPaymentImagesGet } = require("../middlewares/uploadImage");


const createLandingpayment = asyncHandler(async (req, res) => {
  try {

    for(var i=0;i<req.body.floorPayments?.length;i++){

        
        var paymentdata={
            "title":req.body.floorPayments[i].title,
            "bedroom":req.body.floorPayments[i].bedroom,
            "price":req.body.floorPayments[i].price,
            "areasize":req.body.floorPayments[i].areasize,
            "description":req.body.floorPayments[i].description,
            "landingid":req.body.landingId
        }
      
        const floorPayments = [];

    // Parse text fields like floorPayments[0][title], etc.
    Object.entries(req.body).forEach(([key, value]) => {
      const match = key.match(/^floorPayments\[(\d+)]\[(\w+)]$/);
      if (match) {
        const [ , index, field ] = match;
        if (!floorPayments[index]) floorPayments[index] = {};
        floorPayments[index][field] = value;
      }
    });

    // Parse uploaded files with fieldnames like floorPayments[0][paymentimage]
    (req.files || []).forEach((file) => {
      const match = file.fieldname.match(/^floorPayments\[(\d+)]\[paymentimage]$/);
      if (match) {
        const index = parseInt(match[1]);
        if (!floorPayments[index]) floorPayments[index] = {};
        floorPayments[index].paymentimage = file;
      }
    });
    console.log("floorPayments floorPayments")
    console.log(floorPayments)
    // Now process each floor payment image
    for (let i = 0; i < floorPayments.length; i++) {
      const payment = floorPayments[i];

      if (payment) {
        console.log("Resizing image for floorPayment", i);

        const processedImages = await processFloorPaymentImages(payment); // assuming this accepts a single file
        if (processedImages.length > 0) {
            paymentdata.paymentimageurl = `${processedImages[0].url}`;
        }
      }
    }
        console.log("paymentdata paymentdata")
        console.log(paymentdata)
        const newLandingpayment = await Landingpayment.create(paymentdata);
      }
    
      for(var i=0;i<req.body.floorPaymentsget?.length;i++){
        var paymentdata={
            "title":req.body.floorPaymentsget[i].title,
            "bedroom":req.body.floorPaymentsget[i].bedroom,
            "price":req.body.floorPaymentsget[i].price,
            "areasize":req.body.floorPaymentsget[i].areasize,
            "description":req.body.floorPaymentsget[i].description,
            "landingid":req.body.landingId
        }
       

        const floorPaymentsget = [];

        // Parse text fields like floorPayments[0][title], etc.
        Object.entries(req.body).forEach(([key, value]) => {
          const match = key.match(/^floorPaymentsget\[(\d+)]\[(\w+)]$/);
          if (match) {
            const [ , index, field ] = match;
            if (!floorPaymentsget[index]) floorPaymentsget[index] = {};
            floorPaymentsget[index][field] = value;
          }
        });
    
        // Parse uploaded files with fieldnames like floorPayments[0][paymentimage]
        (req.files || []).forEach((file) => {
          const match = file.fieldname.match(/^floorPaymentsget\[(\d+)]\[paymentimageget]$/);
          if (match) {
            const index = parseInt(match[1]);
            if (!floorPaymentsget[index]) floorPaymentsget[index] = {};
            floorPaymentsget[index].paymentimageget = file;
          }
        });
        // console.log("floorPayments floorPayments")
        // console.log(floorPayments)
        // Now process each floor payment image
        for (let i = 0; i < floorPaymentsget.length; i++) {
          const payment = floorPaymentsget[i];
    
          if (payment) {
            console.log("Resizing image for floorPayment", i);
    
            const processedImages = await processFloorPaymentImagesGet(payment); // assuming this accepts a single file
            if (processedImages.length > 0) {
                paymentdata.paymentimageurl = `${processedImages[0].url}`;
            }
          }
        }

        const updatedLandingpayment = await Landingpayment.findByIdAndUpdate(req.body.floorPaymentsget[i].paymentid, paymentdata, {
            new: true,
          });
    }
    //res.json(newLanding);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
    //   "data":newLandingpayment
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLandingpayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    const updatedLandingpayment = await Landingpayment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedLandingpayment
    }
    res.json(message);
    // res.json(updatedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLandingpayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedLandingpayment = await Landingpayment.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedLandingpayment
    }
    res.json(message);
    // res.json(deletedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getLandingpayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getLandingpayment = await Landingpayment.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getLandingpayment
    }
    res.json(message);
    // res.json(getaLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLandingpayment = asyncHandler(async (req, res) => {
  try {
    const getallLandingpayment = await Landingpayment.find().populate("cityid").populate("categoryid");
    res.json(getallLandingpayment);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
createLandingpayment,
  updateLandingpayment,
  deleteLandingpayment,
  getLandingpayment,
  getallLandingpayment,
};
