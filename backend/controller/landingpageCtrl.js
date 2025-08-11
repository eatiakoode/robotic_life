const Landingpage = require("../models/landingpageModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { bannerImageResize,aboutImageResize,gallerySelectedImgsResize,groupFilesByFieldname,processFloorPlanImages,groupFilesByFieldname2,processLandingPlanGet,processLandingPlan} = require("../middlewares/uploadImage");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Landingimage = require("../models/landingimagesModel");
const Landingplan = require("../models/landingfloorModel");
const Landingpayment = require("../models/landingpaymentModel");



const createLandingpage = asyncHandler(async (req, res) => {
  try {
    
    if (req.files && Object.keys(req.files).length > 0) {
      
      const filesByField = groupFilesByFieldname(req.files);

        if (filesByField.bannerimage && filesByField.bannerimage.length > 0) {
         
          const processedImages = await bannerImageResize(filesByField.bannerimage);
         
          if (processedImages.length > 0) {
            req.body.bannerimage = "public/images/landing/" + processedImages[0];
          }
        }
      
      if (filesByField.aboutimage && filesByField.aboutimage.length > 0) {
        
        const processedImages = await bannerImageResize(filesByField.aboutimage);
       
        if (processedImages.length > 0) {
          req.body.aboutimage = "public/images/landing/" + processedImages[0];
        }
      }
    }

    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
   
 
   
    req.body.slug  = slugify(req.body.slug.toLowerCase());

    let faqs = req.body.faqs;

    // If it's a string, parse it
    if (typeof faqs === 'string') {
      try {
        faqs = JSON.parse(faqs);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON in faqsfaqfaq" });
      }
    }

    // Extract ObjectId values
    const faqIds = faqs?.map(faq => faq.value);

// Make sure they are valid ObjectIds
const validFaqIds = faqIds?.filter(id => mongoose.Types.ObjectId.isValid(id));

req.body.faqid  = validFaqIds;
    const newLandingpage = await Landingpage.create(req.body);
    if (req.files && Object.keys(req.files).length > 0) {
      const filesByFields = groupFilesByFieldname2(req.files);
      var gallerySelectedImgsget  =[]
      if (filesByFields.gallerySelectedImgs && filesByFields.gallerySelectedImgs.length > 0) {          
          gallerySelectedImgsget  = await gallerySelectedImgsResize(filesByFields.gallerySelectedImgs);
          for(var i=0;i<gallerySelectedImgsget.length;i++){
            var propertyimage={
              "image":gallerySelectedImgsget[i],
              "landingpageid":newLandingpage._id,
              "title":req.body.title
            }
            const newLandimage = await Landingimage.create(propertyimage);    
          }
      }
    }
  

  const floorPlansnew = [];
if (req.files && Object.keys(req.files).length > 0) {
// Parse text fields like floorPlansget[0][title], etc.
Object.entries(req.body).forEach(([key, value]) => {
  const match = key.match(/^floorPlans\[(\d+)]\[(\w+)]$/);
  if (match) {
    const [, index, field] = match;
    if (!floorPlansnew[index]) floorPlansnew[index] = {};
    floorPlansnew[index][field] = value;
  }
});

// Parse uploaded files with fieldnames like floorPlansget[0][planimageget]
(req.files || []).forEach((file) => {
  const match = file.fieldname.match(/^floorPlans\[(\d+)]\[planimage]$/);
  if (match) {
    const index = parseInt(match[1]);
    if (!floorPlansnew[index]) floorPlansnew[index] = {};
    floorPlansnew[index].floorPlansnew = file;
  }
});
}
// Now process each floor plan
for (let i = 0; i < req.body.floorPlans?.length; i++) {
  const plan = req.body.floorPlans[i];
  const planimage = floorPlansnew[i];
  if (plan) {
    const plandata = {
      title: plan.title,
      areasize: plan.areasize,
      landingpageid: newLandingpage._id,
    };

   
if(planimage){
    const processedImages = await processLandingPlan(planimage); // assumes it returns [{url: "..."}]
    if (processedImages?.length > 0) {
      plandata.planimageurl = processedImages[0].url;
    }
  }
    
  const newPropertyplan = await Landingplan.create(plandata);

    
  }
}

    for(var i=0;i<req.body.paymentPlans?.length;i++){

     
      var plandata={
          "title":req.body.paymentPlans[i].title,
          "areasize":req.body.paymentPlans[i].areasize,
          "price":req.body.paymentPlans[i].price,
          "landingpageid":newLandingpage._id
      }
    
      
      const newPropertyplan = await Landingpayment.create(plandata);
    }
    
    //res.json(newProperty);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newLandingpage
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLandingpage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    

    if (req.files && Object.keys(req.files).length > 0) {
      
      const filesByField = groupFilesByFieldname(req.files);

        if (filesByField.bannerimage && filesByField.bannerimage.length > 0) {
         
          const processedImages = await bannerImageResize(filesByField.bannerimage);
         
          if (processedImages.length > 0) {
            req.body.bannerimage = "public/images/landing/" + processedImages[0];
          }
        }
      
      if (filesByField.aboutimage && filesByField.aboutimage.length > 0) {
        
        const processedImages = await bannerImageResize(filesByField.aboutimage);
       
        if (processedImages.length > 0) {
          req.body.aboutimage = "public/images/landing/" + processedImages[0];
        }
      }
    }

    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
   
 
   
    req.body.slug  = slugify(req.body.slug.toLowerCase());

    let faqs = req.body.faqs;

    // If it's a string, parse it
    if (typeof faqs === 'string') {
      try {
        faqs = JSON.parse(faqs);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON in faqsfaqfaq" });
      }
    }

    // Extract ObjectId values
    const faqIds = faqs?.map(faq => faq.value);

// Make sure they are valid ObjectIds
const validFaqIds = faqIds?.filter(id => mongoose.Types.ObjectId.isValid(id));

req.body.faqid  = validFaqIds;
    const updatedLandingpage = await Landingpage.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    if (req.files && Object.keys(req.files).length > 0) {
      const filesByFields = groupFilesByFieldname2(req.files);
      var gallerySelectedImgsget  =[]
      if (filesByFields.gallerySelectedImgs && filesByFields.gallerySelectedImgs.length > 0) {          
          gallerySelectedImgsget  = await gallerySelectedImgsResize(filesByFields.gallerySelectedImgs);
          for(var i=0;i<gallerySelectedImgsget.length;i++){
            var propertyimage={
              "image":gallerySelectedImgsget[i],
              "landingpageid":id,
              "title":req.body.title
            }
            const newLandingpage = await Landingimage.create(propertyimage);    
          }
      }
    }
  
  const floorPlansnew = [];
if (req.files && Object.keys(req.files).length > 0) {
// Parse text fields like floorPlansget[0][title], etc.
Object.entries(req.body).forEach(([key, value]) => {
  const match = key.match(/^floorPlans\[(\d+)]\[(\w+)]$/);
  if (match) {
    const [, index, field] = match;
    if (!floorPlansnew[index]) floorPlansnew[index] = {};
    floorPlansnew[index][field] = value;
  }
});

// Parse uploaded files with fieldnames like floorPlansget[0][planimageget]
(req.files || []).forEach((file) => {
  const match = file.fieldname.match(/^floorPlans\[(\d+)]\[planimage]$/);
  if (match) {
    const index = parseInt(match[1]);
    if (!floorPlansnew[index]) floorPlansnew[index] = {};
    floorPlansnew[index].floorPlansnew = file;
  }
});
}
// Now process each floor plan
for (let i = 0; i < req.body.floorPlans?.length; i++) {
  const plan = req.body.floorPlans[i];
  const planimage = floorPlansnew[i];
  if (plan) {
    const plandata = {
      title: plan.title,
      areasize: plan.areasize,
      landingpageid: id,
    };

   
if(planimage){
    const processedImages = await processLandingPlan(planimage); // assumes it returns [{url: "..."}]
    if (processedImages?.length > 0) {
      plandata.planimageurl = processedImages[0].url;
    }
  }
    
  const newPropertyplan = await Landingplan.create(plandata);

    
  }
}
const floorPlansgetnew = [];
if (req.files && Object.keys(req.files)?.length > 0) {
// Parse text fields like floorPlansget[0][title], etc.
Object.entries(req.body).forEach(([key, value]) => {
  const match = key.match(/^floorPlansget\[(\d+)]\[(\w+)]$/);
  if (match) {
    const [, index, field] = match;
    if (!floorPlansgetnew[index]) floorPlansgetnew[index] = {};
    floorPlansgetnew[index][field] = value;
  }
});

// Parse uploaded files with fieldnames like floorPlansget[0][planimageget]
(req.files || []).forEach((file) => {
  const match = file.fieldname.match(/^floorPlansget\[(\d+)]\[planimageget]$/);
  if (match) {
    const index = parseInt(match[1]);
    if (!floorPlansgetnew[index]) floorPlansgetnew[index] = {};
    floorPlansgetnew[index].floorPlansgetnew = file;
  }
});
}
// Now process each floor plan
for (let i = 0; i < req.body.floorPlansget?.length; i++) {
  const plan = req.body.floorPlansget[i];
  const planimage = floorPlansgetnew[i];
  if (plan) {
    const plandata = {
      title: plan.title,
      areasize: plan.areasize,
      landingpageid: id,
    };

    
if(planimage){
    const processedImages = await processLandingPlanGet(planimage); // assumes it returns [{url: "..."}]
    if (processedImages.length > 0) {
      plandata.planimageurl = processedImages[0].url;
    }
  }
    
    const updatedPropertyplan = await Landingplan.findByIdAndUpdate(plan.planid, plandata, {
      new: true,
    });

    
  }
}

    for(var i=0;i<req.body.paymentPlans?.length;i++){

     
      var plandata={
          "title":req.body.paymentPlans[i].title,
          "areasize":req.body.paymentPlans[i].areasize,
          "price":req.body.paymentPlans[i].price,
          "landingpageid":id
      }
    
      
      const newPropertyplan = await Landingpayment.create(plandata);
    }
    for(var i=0;i<req.body.paymentPlansget?.length;i++){

     
      var plandata={
          "title":req.body.paymentPlansget[i].title,
          "areasize":req.body.paymentPlansget[i].areasize,
          "price":req.body.paymentPlansget[i].price,
          "landingpageid":id
      }
    
      
      const newPropertyplan =await Landingpayment.findByIdAndUpdate(req.body.paymentPlansget[i].paymentid, plandata, {
        new: true,
      }); 
    }
   
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedLandingpage
    }
    res.json(message);
    // res.json(updatedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLandingpage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedLandingpage = await Landingpage.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedLandingpage
    }
    res.json(message);
    // res.json(deletedLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getLandingpage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getLandingpage = await Landingpage.findById(id).populate('paymentplan').populate("floorplan").populate("galleryimages");
    const message={
      "status":"success",
      "message":"Data deleted sucessfully ii",
      "data":getLandingpage
    }
    res.json(message);
    // res.json(getaLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLandingpage = asyncHandler(async (req, res) => {
  try {
    const getallLandingpage = await Landingpage.find();
    res.json(getallLandingpage);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createLandingpage,
  updateLandingpage,
  deleteLandingpage,
  getLandingpage,
  getallLandingpage,
};
