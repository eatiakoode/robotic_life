const Faq = require("../models/faqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createFaq = asyncHandler(async (req, res) => {
  try {
    
    const newFaq = await Faq.create(req.body);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newFaq
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
     const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedFaq
    }
    res.json(message);
    // res.json(updatedFaq);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedFaq = await Faq.findByIdAndDelete(id);

    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedFaq
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaFaq= await Faq.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaFaq
    }
    res.json(message);
   //res.json(getaFaq);
  } catch (error) {
    throw new Error(error);
  }
});
const getallFaq = asyncHandler(async (req, res) => {
  try {
    // const getallFaq = await Faq.find();
    // res.json(getallFaq);
    let limit=100;
        let skip=1;
        
    
        if (req.query.limit ) {
          limit=req.query.limit;
          skip=req.query.skip;     
      }
       
        const [propertyList, totalCount] = await Promise.all([
                  Faq.find()
                    .sort({ _id: -1})
                    .skip((skip - 1) * limit)
                    .limit(limit)
                    .lean(),
                
                  Faq.countDocuments() // total matching without skip/limit
                ]);
                // propertyList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                // console.log(propertyList)
                res.status(200).json({
                  items: propertyList,
                  totalCount: totalCount,
                  currentPage: skip,
                  totalPages: Math.ceil(totalCount / limit)
                });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createFaq,
  updateFaq,
  deleteFaq,
  getFaq,
  getallFaq,
};
