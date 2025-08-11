const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { featuredImageResize,sitePlanResize,propertySelectedImgsResize,processUploadedPDFs,processFloorPlanImagesAdd,groupFilesByFieldname,groupFilesByFieldname2,featuredImageResizeAdd,featuredImageResizeAddSite,featuredImageResizeAddMaster,propertySelectedImgsResizeadd,processUploadedPDFsadd,masterPlanResize,processFloorPlanImages } = require("../middlewares/uploadImage");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Propertyimage = require("../models/propertyimagesModel");
const Propertyplan = require("../models/propertyfloorModel");
const fs = require("fs");
const path = require("path");

const createProperty = asyncHandler(async (req, res) => {
  try {
   let filesByField = {};
    if (req.files && Object.keys(req.files).length > 0) {
      // console.log("pdfshow1")
      var  propertySelectedImgs  =[]
      // if (req.files && req.files.propertySelectedImgs && req.files.propertySelectedImgs.length > 0  && Object.keys(req.files.propertySelectedImgs).length > 0 && Array.isArray(req.files.propertySelectedImgs)) {
      //   // console.log("no propertySelectedImgs")
      //    propertySelectedImgs  = await propertySelectedImgsResize(req);
      //   //  console.log(propertySelectedImgs)
      //   if (propertySelectedImgs.length > 0) {
      //     // ✅ Append logo filename to req.body
      //     // console.log("Property Images:", propertySelectedImgs);
      //     req.body.propertyimageurl = propertySelectedImgs;
      //   }
      // }
      const selectedImgs = req.files?.filter(file => file.fieldname === "propertySelectedImgs");

if (Array.isArray(selectedImgs) && selectedImgs.length > 0) {
  // console.log("Filtered propertySelectedImgs:", selectedImgs);
  propertySelectedImgs = await propertySelectedImgsResize(selectedImgs); // pass array directly
  // if (propertySelectedImgs.length > 0) {
  //   console.log("pdfshow2")
  //   req.body.propertyimageurl = propertySelectedImgs;
  // }
}
       filesByField = groupFilesByFieldname(req.files);
      
      if (filesByField.featuredimage && filesByField.featuredimage.length > 0) {
        console.log("pdfshow2")
        
        const processedImages = await featuredImageResizeAdd(filesByField.featuredimage);
        
        if (processedImages.length > 0) {
          console.log("pdfshow3")
          // req.body.featuredimageurl = "public/images/property/" + processedImages[0];
          const ext = path.extname(filesByField.featuredimage[0].originalname).toLowerCase();
          const name=filesByField.featuredimage[0].originalname.replace(ext, "");
          const featuredimageurl={
            "url":"public/images/property/" + processedImages[0],
            "name":name
          }
          req.body.featuredimageurl  = featuredimageurl;
        }
      }

      if (filesByField.siteplan && filesByField.siteplan.length > 0) {
              
        const processedImages = await featuredImageResizeAddSite(filesByField.siteplan);
        
        if (processedImages.length > 0) {
          console.log("pdfshow4")
          // req.body.siteplanurl = "public/images/siteplan/" + processedImages[0];
           const ext = path.extname(filesByField.siteplan[0].originalname).toLowerCase();
          const name=filesByField.siteplan[0].originalname.replace(ext, "");
          const siteplanurl={
            "url":"public/images/siteplan/" + processedImages[0],
            "name":name
          }
          req.body.siteplanurl  = siteplanurl;
        }
      }
      if (filesByField.masterplan && filesByField.masterplan.length > 0) {
              
        const processedImages = await featuredImageResizeAddMaster(filesByField.masterplan);
        
        if (processedImages.length > 0) {
          console.log("pdfshow5")
          // req.body.masterplanurl = "public/images/masterplan/" + processedImages[0];
           const ext = path.extname(filesByField.masterplan[0].originalname).toLowerCase();
          const name=filesByField.masterplan[0].originalname.replace(ext, "");
          const masterplanurl={
            "url":"public/images/masterplan/" + processedImages[0],
            "name":name
          }
          req.body.masterplanurl  = masterplanurl;
        }
      }
console.log("pdfshow12")
      if (filesByField.pdffile && filesByField.pdffile.length > 0) {
              // console.log("pdffile")
              console.log("pdfshow6")
        const processedImages = await processUploadedPDFsadd(filesByField.pdffile);
        //  console.log(processedImages)
        if (processedImages.length > 0) {
          console.log("pdfshow7")
          req.body.brochurepdf = "public/images/pdffile/" + processedImages[0];
        }
      }
     console.log("pdfshow13")
      // if (req.files && req.files.featuredimage && Array.isArray(req.files.featuredimage) && req.files.featuredimage.length > 0 ) { 
      //   console.log(req.files.featuredimage)
      //   console.log("no featuredImageResize")
      //   const processedImages  =await featuredImageResize(req);
      //     console.log(processedImages)
      //   if (processedImages.length > 0) {
      //     // ✅ Append logo filename to req.body
      //     req.body.featuredimageurl = "public/images/property/"+processedImages[0];
      //   }
      // }
//       if (req.files && req.files.siteplan && Array.isArray(req.files.siteplan) && req.files.siteplan.length > 0 ) { 
        
//         console.log(req.files.siteplan)
//         console.log("no siteplan")
//         const processedImagesplan  =await sitePlanResize(req);
// console.log(processedImagesplan)
//         if (processedImagesplan.length > 0) {
//           // ✅ Append logo filename to req.body
//           req.body.siteplanurl = "public/images/siteplan/"+processedImagesplan[0];
//         }
//       }
    //   if (req.files && req.files.pdffile && Array.isArray(req.files.pdffile) && req.files.pdffile.length > 0 ) { 
        
       
    //     const processedImagesplan  =await processUploadedPDFs(req);

    //     if (processedImagesplan.length > 0) {
    //       console.log("pdfshow processedImagesplan")
    // console.log(processedImagesplan)
    //       // ✅ Append logo filename to req.body
    //       req.body.brochurepdf = "public/images/pdffile/"+processedImagesplan[0];
    //     }
    //   }
      
    }

    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    req.body.pricesqft = parseFloat(req.body.pricesqft.replace(/,/g, ""));

    const newProperty = await Property.create(req.body);
    // if (propertySelectedImgs.length > 0) {
    //   // ✅ Append logo filename to req.body
    //   // console.log("Property Images:", propertySelectedImgs);
    //   // req.body.propertyimageurl = propertySelectedImgs;
    //   for(var i=0;i<propertySelectedImgs.length;i++){
    //     var propertyimage={
    //       "image":propertySelectedImgs[i],
    //       "propertyid":newProperty._id,
    //       "title":newProperty.title
    //     }
    //     const newPropertyw = await Propertyimage.create(propertyimage);

    //   }
    // }

    // const filesByFields = groupFilesByFieldname2(req.files);
    //       var gallerySelectedImgsget  =[]
    //       console.log("pdfshow14")
    //       if (filesByFields.propertySelectedImgs && filesByFields.propertySelectedImgs.length > 0) {          
    //           gallerySelectedImgsget  = await propertySelectedImgsResizeadd(filesByFields.propertySelectedImgs);
    //           for(var i=0;i<gallerySelectedImgsget.length;i++){
    //             console.log("pdfshow8")
    //             var propertyimage={
    //               "image":gallerySelectedImgsget[i],
    //               "propertyid":newProperty._id,
    //               "title":req.body.title
    //             }
    //             const newLandimage = await Propertyimage.create(propertyimage);    
    //           }
    //       }
    // console.log("pdfshow14")
    if (filesByField.propertySelectedImgs && filesByField.propertySelectedImgs.length > 0) {
    if (propertySelectedImgs?.length > 0) {
      // ✅ Append logo filename to req.body
      // console.log("Property Images:", propertySelectedImgs);
      // req.body.propertyimageurl = propertySelectedImgs;
      for(var i=0;i<propertySelectedImgs?.length;i++){
        // var propertyimage={
        //   "image":propertySelectedImgs[i],
        //   "propertyid":newProperty._id,
        //   "title":req.body.title
        // }
          const ext = path.extname(filesByField.propertySelectedImgs[i].originalname).toLowerCase();
        const name=filesByField.propertySelectedImgs[i].originalname.replace(ext, "");
        const masterplanurl={
            "url":propertySelectedImgs[i],
            "name":name
          }
           var propertyimage={
          "image":masterplanurl,
          "propertyid":id,
          "title":req.body.title
        }
        const newProperty1 = await Propertyimage.create(propertyimage);

      }
    }
  }
    //res.json(newProperty);
    console.log("pdfshow15")

    // const floorPlansnew = [];
    // if (req.files && Object.keys(req.files).length > 0) {
    //   console.log("pdfshow9")
    // // Parse text fields like floorPlansget[0][title], etc.
    // Object.entries(req.body).forEach(([key, value]) => {
    //   const match = key.match(/^floorPlans\[(\d+)]\[(\w+)]$/);
    //   if (match) {
    //     const [, index, field] = match;
    //     if (!floorPlansnew[index]) floorPlansnew[index] = {};
    //     floorPlansnew[index][field] = value;
    //   }
    // });

    // // Parse uploaded files with fieldnames like floorPlansget[0][planimageget]
    // (req.files || []).forEach((file) => {
    //   const match = file.fieldname.match(/^floorPlans\[(\d+)]\[planimage]$/);
    //   if (match) {
    //     const index = parseInt(match[1]);
    //     if (!floorPlansnew[index]) floorPlansnew[index] = {};
    //     floorPlansnew[index].floorPlansnew = file;
    //   }
    // });
    // }
    // // Now process each floor plan
    // for (let i = 0; i < req.body.floorPlans?.length; i++) {
    //   console.log("pdfshow10")
    //   const plan = req.body.floorPlans[i];
    //   const planimage = floorPlansnew[i];
    //   if (plan) {
    //     var plandata={
    //         "title":req.body.floorPlans[i].title,
    //         "bedroom":req.body.floorPlans[i].bedroom,
    //         "price":req.body.floorPlans[i].price,
    //         "areasize":req.body.floorPlans[i].areasize,
    //         "description":req.body.floorPlans[i].description,
    //         "propertyid":newProperty._id
    //     }

      
    // if(planimage){
    //     const processedImages = await processFloorPlanImagesAdd(planimage); // assumes it returns [{url: "..."}]
    //     if (processedImages?.length > 0) {
    //       console.log("pdfshow11")
    //       plandata.planimageurl = processedImages[0].url;
    //     }
    //   } 
    //   console.log("plandata")
    //   console.log(plandata)
    //   const newPropertyplan = await Propertyplan.create(plandata);       
    //   // const newPropertyplan = await Landingplan.create(plandata);        
    //   }
    // }

    for(var i=0;i<req.body.floorPlans?.length;i++){
          
            var plandata={
                "title":req.body.floorPlans[i].title,
                "bedroom":req.body.floorPlans[i].bedroom,
                "price":req.body.floorPlans[i].price,
                "areasize":req.body.floorPlans[i].areasize,
                "description":req.body.floorPlans[i].description,
                "propertyid":newProperty._id
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
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newProperty
    }
    res.json(message);
  } catch (error) {
     if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 2MB." });
    }
    throw new Error(error);
  }
});
const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    // console.log("pdfshow")
    // console.log(req.files)
let filesByField = {};
    if (req.files && Object.keys(req.files).length > 0) {
      // console.log("no propertySelectedImgs")
      // var  propertySelectedImgs  =[]
      // if (req.files && req.files.propertySelectedImgs && req.files.propertySelectedImgs.length > 0  && Object.keys(req.files.propertySelectedImgs).length > 0 && Array.isArray(req.files.propertySelectedImgs)) {
      //   console.log("no propertySelectedImgs")
      //    propertySelectedImgs  = await propertySelectedImgsResize(req);
      //   if (propertySelectedImgs.length > 0) {
      //     // ✅ Append logo filename to req.body
      //     // console.log("Property Images:", propertySelectedImgs);
      //     req.body.propertyimageurl = propertySelectedImgs;
      //   }
      // }

      // Filter manually from req.files
      var  propertySelectedImgs  =[]
const selectedImgs = req.files?.filter(file => file.fieldname === "propertySelectedImgs");

if (Array.isArray(selectedImgs) && selectedImgs.length > 0) {
  // console.log("Filtered propertySelectedImgs:", selectedImgs);
  propertySelectedImgs = await propertySelectedImgsResize(selectedImgs); // pass array directly
  if (propertySelectedImgs.length > 0) {
    req.body.propertyimageurl = propertySelectedImgs;
  }
}

     
      // if (req.files && req.files.featuredimage && Array.isArray(req.files.featuredimage) && req.files.featuredimage.length > 0 ) { 
      //  console.log("no featuredImageResize")
      //   const processedImages  =await featuredImageResize(req);
      //   if (processedImages.length > 0) {
      //     // ✅ Append logo filename to req.body
      //     req.body.featuredimageurl = "public/images/property/"+processedImages[0];
      //   }
      // }
       filesByField = groupFilesByFieldname(req.files);
      // console.log("filesByField")
      // console.log(filesByField)
            
            if (filesByField.featuredimage && filesByField.featuredimage.length > 0) {
              console.log("no featuredImageResize")
              
              const processedImages = await featuredImageResizeAdd(filesByField.featuredimage);
              
              if (processedImages.length > 0) {
                // req.body.featuredimageurl= "public/images/property/" + processedImages[0];
                const ext = path.extname(filesByField.featuredimage[0].originalname).toLowerCase();
                const name=filesByField.featuredimage[0].originalname.replace(ext, "");
                const featuredimageurl={
                  "url":"public/images/property/" + processedImages[0],
                  "name":name
                }
                req.body.featuredimageurl  = featuredimageurl;
              }
            }
      if (filesByField.siteplan && filesByField.siteplan.length > 0) {
              
        const processedImages = await featuredImageResizeAddSite(filesByField.siteplan);
        
        if (processedImages.length > 0) {
          // req.body.siteplanurl = "public/images/siteplan/" + processedImages[0];
           const ext = path.extname(filesByField.siteplan[0].originalname).toLowerCase();
          const name=filesByField.siteplan[0].originalname.replace(ext, "");
          const siteplanurl={
            "url":"public/images/siteplan/" + processedImages[0],
            "name":name
          }
          req.body.siteplanurl  = siteplanurl;
        }
      }
      if (filesByField.masterplan && filesByField.masterplan.length > 0) {
              
        const processedImages = await featuredImageResizeAddMaster(filesByField.masterplan);
        
        if (processedImages.length > 0) {
          const ext = path.extname(filesByField.masterplan[0].originalname).toLowerCase();
          const name=filesByField.masterplan[0].originalname.replace(ext, "");
          const masterplanurl={
            "url":"public/images/masterplan/" + processedImages[0],
            "name":name
          }
          req.body.masterplanurl  = masterplanurl;

        }
      }
      
      if (req.files && req.files.pdffile && Array.isArray(req.files.pdffile) && req.files.pdffile.length > 0 ) { 
        
       
        const processedImagesplan  =await processUploadedPDFs(req);

        if (processedImagesplan.length > 0) {
          
          // ✅ Append logo filename to req.body
          req.body.brochurepdf = "public/images/pdffile/"+processedImagesplan[0];
        }
      }
    }
    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    req.body.admin_approve = true;
    // const getProperty = await Property.findById(id);
    // if (getProperty.propertyimageurl?.length > 0) {
    //   // ✅ Append logo filename to req.body
    //   // console.log("Property Images:", propertySelectedImgs);
    //   // req.body.propertyimageurl = propertySelectedImgs;
    //   for(var i=0;i<getProperty.propertyimageurl?.length;i++){
    //     var propertyimage={
    //       "image":getProperty.propertyimageurl[i],
    //       "propertyid":id,
    //       "title":getProperty.title
    //     }
    //     const newProperty = await Propertyimage.create(propertyimage);

    //   }
    // }
    // req.body.propertyimageurl=[];
    req.body.pricesqft = parseFloat(req.body.pricesqft.replace(/,/g, ""));


    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (filesByField.propertySelectedImgs && filesByField.propertySelectedImgs.length > 0) {
    if (propertySelectedImgs?.length > 0) {
      // ✅ Append logo filename to req.body
      // console.log("Property Images:", propertySelectedImgs);
      // req.body.propertyimageurl = propertySelectedImgs;
      // console.log("filesByField");
      //   console.log(filesByField);
      for(var i=0;i<propertySelectedImgs?.length;i++){
        // var propertyimage={
        //   "image":propertySelectedImgs[i],
        //   "propertyid":id,
        //   "title":req.body.title
        // }
        // console.log("propertySelectedImgs");
        // console.log(propertySelectedImgs);
        const ext = path.extname(filesByField.propertySelectedImgs[i].originalname).toLowerCase();
        const name=filesByField.propertySelectedImgs[i].originalname.replace(ext, "");
        const masterplanurl={
            "url":propertySelectedImgs[i],
            "name":name
          }
           var propertyimage={
          "image":masterplanurl,
          "propertyid":id,
          "title":req.body.title
        }
        // console.log("propertyimage");
        // console.log(propertyimage);
        const newProperty = await Propertyimage.create(propertyimage);

      }
    }
    }
    
   
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedProperty
    }
    res.json(message);
    // res.json(updatedProperty);
  } catch (error) {
    console.error("Caught in route:", error);
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 2MB." });
    }
    
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
    });
    
    throw new Error(error);
  }
});
const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedProperty
    }
    res.json(message);
    // res.json(deletedProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const getProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getProperty = await Property.findById(id).populate('images').populate("floorplan");
    const message={
      "status":"success",
      "message":"Data deleted sucessfully ii",
      "data":getProperty
    }
    res.json(message);
    // res.json(getaProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const getallProperty = asyncHandler(async (req, res) => {
  try {
    let limit=100;
    let skip=1;
    

    if (req.query.limit ) {
      limit=req.query.limit;
      skip=req.query.skip;     
  }
    // const getallProperty = await Property.find().populate("cityid").populate("categoryid").sort({updated_at: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();

    const [propertyList, totalCount] = await Promise.all([
          Property.find()
            .populate("cityid")
            .populate("categoryid")
            .populate("locationid")
            .sort({ _id: -1})
            .skip((skip - 1) * limit)
            .limit(limit)
            .lean(),
        
          Property.countDocuments() // total matching without skip/limit
        ]);
        // propertyList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        // console.log(propertyList)
        res.status(200).json({
          items: propertyList,
          totalCount: totalCount,
          currentPage: skip,
          totalPages: Math.ceil(totalCount / limit)
        });
    // res.json(getallProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const imageDeleteProperty = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // validateMongoDbId(id);
  try {
    console.log("Body:", req.body);

    const id = req.body.propertyid;
    const fieldName = req.body.fieldname;
    const imagePath = req.body.imageurl;
    if (!id || !fieldName || !imagePath) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedData = {
      [fieldName]: ''
    };
    const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
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
  createProperty,
  updateProperty,
  deleteProperty,
  getProperty,
  getallProperty,
  imageDeleteProperty
};
