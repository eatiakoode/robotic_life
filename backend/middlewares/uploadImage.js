const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  // filename: function (req, file, cb) {
  //   const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  // },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // check if this is used
    const filename = `upload-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };
const multerFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/svg+xml",       // ✅ for SVG files
    "application/pdf",     // ✅ for PDFs
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.warn(`Unsupported file: ${file.originalname}, Type: ${file.mimetype}`);
    cb(new Error("Unsupported file format"), false);
  }
};


const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  // limits: { fileSize: 1000000 },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB

});
const dynamicFields = Array.from({ length: 20 }, (_, i) => ({
  name: `floorPlans[${i}][planimage]`, maxCount: 1
}));
const photoUploadMiddleware = uploadPhoto.fields([
  { name: 'featuredimage', maxCount: 1 },
  { name: 'siteplan', maxCount: 1 },
  { name: 'pdffile', maxCount: 1 },
  { name: 'robotSelectedImgs', maxCount: 10 },
  // ...dynamicFields


  // { name: 'planimage', maxCount: 80 }
  // { name: 'citylogo', maxCount: 1 },

]);
// const photoUploadMiddleware = uploadPhoto.any(); 
// const uploadPhoto1 = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 1000000 },
// });
const photoUploadMiddleware1 = uploadPhoto.any(); // accept any form field name

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(file.path);
    })
  );
  next();
};

const blogImgResize = async (req) => {
  const processedFilenames = [];

  const outputDir = path.join("public", "images", "blogs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      // if (isSvg) {
      // Copy SVG file
      fs.copyFileSync(file.path, outputPath);
      // await fs.promises.writeFile(outputPath, file.data);
      // } else {
      //   // Resize non-SVG file
      //   await sharp(file.path)
      //     .resize(650, 400)
      //     .toFormat('jpeg')
      //     .jpeg({ quality: 90 })
      //     .toFile(outputPath);
      // }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

// const blogImgResize = async (req) => {
//   if (!req.files || !Array.isArray(req.files)) return;

//   const processedFilenames = [];

//   await Promise.all(
//     req.files.map(async (file) => {
//       // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
//       const filename =file.filename
//       const outputPath = path.join("public", "images", "blogs", filename);

//       await sharp(file.path)
//         .resize(650, 400)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       fs.unlinkSync(file.path); // delete original uploaded file

//       processedFilenames.push(filename);
//     })
//   );

//   return processedFilenames;
// };

const manufacturerImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return [];

  const processedFilenames = [];

  // Ensure the target directory exists
  const outputDir = path.join("public", "images", "manufacturer");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.filename; // multer already gives unique name with original extension
      const outputPath = path.join(outputDir, filename);
      const ext = path.extname(file.originalname).toLowerCase();

      if (ext === ".svg" || ext === ".webp") {
        // Copy vectors/WEBP as-is
        fs.copyFileSync(file.path, outputPath);
      } else {
        // Pad to 260x260 without cropping so the full logo remains visible
        const isPng = ext === ".png";
        const pipeline = sharp(file.path).resize(260, 260, {
          fit: "contain",
          background: isPng ? { r: 255, g: 255, b: 255, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 },
        });
        if (isPng) {
          await pipeline.png({ quality: 90 }).toFile(outputPath);
        } else {
          await pipeline.jpeg({ quality: 90 }).toFile(outputPath);
        }
      }

      fs.unlinkSync(file.path); // remove temp uploaded file
      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

const robotImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return [];

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "robot");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.filename; // multer gives unique name
      const outputPath = path.join(outputDir, filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // remove temp uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

// const categoryImgResize = async (req) => {
//   if (!req.files || !Array.isArray(req.files)) return;

//   const processedFilenames = [];

//   await Promise.all(
//     req.files.map(async (file) => {
//       // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
//       const filename =file.filename
//       const outputPath = path.join("public", "images", "category", filename);

//       await sharp(file.path)
//         .resize(750, 450)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       fs.unlinkSync(file.path); // delete original uploaded file

//       processedFilenames.push(filename);
//     })
//   );

//   return processedFilenames;
// };


const categoryImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return [];

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "category");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = file.filename; // keep original multer filename
      const outputPath = path.join(outputDir, filename);

      if (ext === ".svg" || ext === ".webp") {
        // Copy vector or webp as-is for quality
        fs.copyFileSync(file.path, outputPath);
      } else {
        // Pad to square 260x260 while preserving full image inside the canvas
        const isPng = ext === ".png";
        const pipeline = sharp(file.path).resize(260, 260, {
          fit: "contain",
          background: isPng ? { r: 255, g: 255, b: 255, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 },
        });
        if (isPng) {
          await pipeline.png({ quality: 90 }).toFile(outputPath);
        } else {
          await pipeline.jpeg({ quality: 90 }).toFile(outputPath);
        }
      }

      fs.unlinkSync(file.path);
      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};


const featuredImageResize = async (req) => {
  // if (!req.files.featuredimage || !Array.isArray(req.files.featuredimage)) return;

  // const processedFilenames = [];

  // await Promise.all(
  //   req.files.featuredimage.map(async (file) => {
  //     // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
  //     const filename =file.filename
  //     const outputPath = path.join("public", "images", "property", filename);

  //     await sharp(file.path)
  //       .resize(750, 450)
  //       .toFormat("jpeg")
  //       .jpeg({ quality: 90 })
  //       .toFile(outputPath);

  //     fs.unlinkSync(file.path); // delete original uploaded file

  //     processedFilenames.push(filename);
  //   })
  // );

  // return processedFilenames;
  if (!req.files.featuredimage || !Array.isArray(req.files.featuredimage)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "property");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.featuredimage.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      // if (isSvg) {
      // Copy SVG file
      fs.copyFileSync(file.path, outputPath);
      // await fs.promises.writeFile(outputPath, file.data);
      // } else {
      //   // Resize non-SVG file
      //   await sharp(file.path)
      //     .resize(650, 400)
      //     .toFormat('jpeg')
      //     .jpeg({ quality: 90 })
      //     .toFile(outputPath);
      // }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const sitePlanResize = async (req) => {


  // if (!req.files.siteplan || !Array.isArray(req.files.siteplan)) return;

  // const processedFilenames = [];

  // await Promise.all(
  //   req.files.siteplan.map(async (file) => {
  //     // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
  //     const filename =file.filename
  //     const outputPath = path.join("public", "images", "siteplan", filename);

  //     await sharp(file.path)
  //       .resize(800, 420)
  //       .toFormat("jpeg")
  //       .jpeg({ quality: 90 })
  //       .toFile(outputPath);

  //     fs.unlinkSync(file.path); // delete original uploaded file

  //     processedFilenames.push(filename);
  //   })
  // );

  // return processedFilenames;
  if (!req.files.siteplan || !Array.isArray(req.files.siteplan)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "siteplan");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      // if (isSvg) {
      // Copy SVG file
      fs.copyFileSync(file.path, outputPath);
      // await fs.promises.writeFile(outputPath, file.data);
      // } else {
      //   // Resize non-SVG file
      //   await sharp(file.path)
      //     .resize(650, 400)
      //     .toFormat('jpeg')
      //     .jpeg({ quality: 90 })
      //     .toFile(outputPath);
      // }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const masterPlanResize = async (req) => {


  // if (!req.files.masterplan || !Array.isArray(req.files.masterplan)) return;

  // const processedFilenames = [];

  // await Promise.all(
  //   req.files.masterplan.map(async (file) => {
  //     // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
  //     const filename =file.filename
  //     const outputPath = path.join("public", "images", "masterplan", filename);

  //     await sharp(file.path)
  //       .resize(800, 420)
  //       .toFormat("jpeg")
  //       .jpeg({ quality: 90 })
  //       .toFile(outputPath);

  //     fs.unlinkSync(file.path); // delete original uploaded file

  //     processedFilenames.push(filename);
  //   })
  // );

  // return processedFilenames;
  if (!req.files.masterplan || !Array.isArray(req.files.masterplan)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "masterplan");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.masterplan.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      // if (isSvg) {
      // Copy SVG file
      fs.copyFileSync(file.path, outputPath);
      // await fs.promises.writeFile(outputPath, file.data);
      // } else {
      //   // Resize non-SVG file
      //   await sharp(file.path)
      //     .resize(650, 400)
      //     .toFormat('jpeg')
      //     .jpeg({ quality: 90 })
      //     .toFile(outputPath);
      // }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const testimonialImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "testimonial", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

// const propertySelectedImgsResize = async (req) => {

//   // if (!req.files.propertySelectedImgs || !Array.isArray(req.files.propertySelectedImgs)) return;

//   // const processedFilenames = [];
//   // await Promise.all(
//   //   req.files.propertySelectedImgs.map(async (file) => {

//   //     // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
//   //     const filename =file.filename
//   //     const outputPath = path.join("public", "images", "propertyimage", filename);

//   //     await sharp(file.path)
//   //       .resize(750, 450)
//   //       .toFormat("jpeg")
//   //       .jpeg({ quality: 90 })
//   //       .toFile(outputPath);

//   //     // fs.unlinkSync(file.path); // delete original uploaded file

//   //     processedFilenames.push("public/images/propertyimage/"+filename);
//   //   })
//   // );

//   // return processedFilenames;
//   console.log("req.files.propertySelectedImgs")
//   console.log(req.files.propertySelectedImgs)
//   if (!req.files.propertySelectedImgs || !Array.isArray(req.files.propertySelectedImgs)) return;

//     const processedFilenames = [];

//     const outputDir = path.join("public", "propertyimage", "amenity");
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }

//     await Promise.all(
//       req.files.propertySelectedImgs.map(async (file) => {
//         const ext = path.extname(file.originalname).toLowerCase();
//         const isSvg = ext === '.svg';

//         const filename = file.filename;
//         const outputPath = path.join(outputDir, filename);

//         // if (isSvg) {
//           // Copy SVG file
//           fs.copyFileSync(file.path, outputPath);
//           // await fs.promises.writeFile(outputPath, file.data);
//         // } else {
//         //   // Resize non-SVG file
//         //   await sharp(file.path)
//         //     .resize(650, 400)
//         //     .toFormat('jpeg')
//         //     .jpeg({ quality: 90 })
//         //     .toFile(outputPath);
//         // }

//         // Optional cleanup
//         fs.unlinkSync(file.path);

//         processedFilenames.push(filename);
//       })
//     );

//     return processedFilenames;
// };


const propertySelectedImgsResize = async (filesArray) => {
  const processedFilenames = [];
  const outputDir = path.join("public", "images", "propertyimage");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    filesArray.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      fs.copyFileSync(file.path, outputPath);
      fs.unlinkSync(file.path);

      // processedFilenames.push(filename);
      processedFilenames.push("public/images/propertyimage/" + filename);
    })
  );

  return processedFilenames;
};

const cityImgResize = async (req) => {

  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "city", filename);

      await sharp(file.path)
        .resize(755, 355)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file


      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};


const locationImgResize = async (req) => {

  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "location", filename);

      await sharp(file.path)
        .resize(755, 355)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file


      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const processFloorPlanImagesAdd = async (req) => {
  // const processedFilenames = [];

  // if (!req.floorPlansnew) return [];

  // const file = req.floorPlansnew;

  // // Remove original extension before adding .jpeg
  // const originalNameWithoutExt = path.basename(file.originalname, path.extname(file.originalname));
  // const filename = `floorplan-${Date.now()}-${originalNameWithoutExt}.jpeg`;
  // const outputPath = path.join("public", "images", "propertyplan", filename);

  // try {
  //   await sharp(file.path)
  //     .resize(750, 450)
  //     .toFormat("jpeg")
  //     .jpeg({ quality: 90 })
  //     .toFile(outputPath);

  //   fs.unlinkSync(file.path); // clean up original

  //   processedFilenames.push({
  //     index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]),
  //     filename,
  //     url: `public/images/propertyplan/${filename}`,
  //   });
  // } catch (err) {
  //   console.error("Error processing floor plan image:", err.message);
  //   fs.unlinkSync(file.path);
  // }

  // return processedFilenames;
  const processedFilenames = [];

  if (!req.planimage) return [];

  const file = req.planimage;
  console.log("test")
  console.log(file)

  const ext = path.extname(file.originalname).toLowerCase();
  const isSvgOrWebp = ext === '.svg' || ext === '.webp';

  const filename = `floorplan-${Date.now()}-${file.originalname}`;
  const outputDir = path.join("public", "images", "propertyplan");
  const outputPath = path.join(outputDir, filename);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (isSvgOrWebp) {
    // just copy the file (no resizing)
    fs.copyFileSync(file.path, outputPath);
  } else {
    // use sharp to convert to jpeg
    await sharp(file.path)
      .resize(750, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(outputPath);
  }

  // remove temp file after processing
  fs.unlinkSync(file.path);

  processedFilenames.push({
    index: parseInt(file.fieldname.match(/\[(\d+)]/)?.[1] || 0), // fallback to 0 if no index found
    filename,
    url: `public/images/propertyplan/${filename}`,
  });

  return processedFilenames;
};

// const processFloorPlanImages = async (req) => {
//   const processedFilenames = [];
//   if (!req.planimage ) return [];


//   var file=req.planimage

//       const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
//       const outputPath = path.join("public", "images", "propertyplan", filename);
//       await sharp(file.path)
//         .resize(750, 450)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       // Optional: delete original file after processing
//       // fs.unlinkSync(file.path);

//       processedFilenames.push({
//         index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
//         filename,
//         url: `public/images/propertyplan/${filename}`,
//       });

//   return processedFilenames;
// };

const processFloorPlanImages = async (req) => {
  const processedFilenames = [];

  if (!req.planimage) return [];

  const file = req.planimage;
  console.log(file)
  console.log("file")


  const ext = path.extname(file.originalname).toLowerCase();
  const isSvgOrWebp = ext === '.svg' || ext === '.webp';

  const filename = `floorplan-${Date.now()}${ext}`;
  const outputDir = path.join("public", "images", "propertyplan");
  const outputPath = path.join(outputDir, filename);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (isSvgOrWebp) {
    // just copy the file (no resizing)
    fs.copyFileSync(file.path, outputPath);
  } else {
    // use sharp to convert to jpeg
    await sharp(file.path)
      .resize(750, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(outputPath);
  }

  // remove temp file after processing
  fs.unlinkSync(file.path);

  processedFilenames.push({
    index: parseInt(file.fieldname.match(/\[(\d+)]/)?.[1] || 0), // fallback to 0 if no index found
    filename,
    url: `public/images/propertyplan/${filename}`,
  });

  return processedFilenames;
};

const processFloorPlanImagesGet = async (req) => {
  // const processedFilenames = [];

  // if (!req.planimageget ) return [];

  // var file=req.planimageget
  //     const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
  //     const outputPath = path.join("public", "images", "propertyplan", filename);
  //     await sharp(file.path)
  //       .resize(750, 450)
  //       .toFormat("jpeg")
  //       .jpeg({ quality: 90 })
  //       .toFile(outputPath);

  //     // Optional: delete original file after processing
  //     fs.unlinkSync(file.path);

  //     processedFilenames.push({
  //       index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
  //       filename,
  //       url: `public/images/propertyplan/${filename}`,
  //     });

  // return processedFilenames;
  const processedFilenames = [];

  if (!req.planimageget) return [];

  const file = req.planimageget;

  const ext = path.extname(file.originalname).toLowerCase();
  const isSvgOrWebp = ext === '.svg' || ext === '.webp';

  const filename = `floorplan-${Date.now()}${ext}`;
  const outputDir = path.join("public", "images", "propertyplan");
  const outputPath = path.join(outputDir, filename);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (isSvgOrWebp) {
    // just copy the file (no resizing)
    fs.copyFileSync(file.path, outputPath);
  } else {
    // use sharp to convert to jpeg
    await sharp(file.path)
      .resize(750, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(outputPath);
  }

  // remove temp file after processing
  fs.unlinkSync(file.path);

  processedFilenames.push({
    index: parseInt(file.fieldname.match(/\[(\d+)]/)?.[1] || 0), // fallback to 0 if no index found
    filename,
    url: `public/images/propertyplan/${filename}`,
  });

  return processedFilenames;
};
const processLandingPlanGet = async (req) => {
  const processedFilenames = [];
  if (!req) return [];

  var file = req.floorPlansgetnew

  const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
  const outputPath = path.join("public", "images", "landing", filename);
  await sharp(file.path)
    .resize(750, 450)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  // Optional: delete original file after processing
  fs.unlinkSync(file.path);

  processedFilenames.push({
    index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
    filename,
    url: `public/images/landing/${filename}`,
  });

  return processedFilenames;
};
const processLandingPlan = async (req) => {
  const processedFilenames = [];

  if (!req.floorPlansnew) return [];

  var file = req.floorPlansnew
  const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
  const outputPath = path.join("public", "images", "propertyplan", filename);
  await sharp(file.path)
    .resize(750, 450)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  // Optional: delete original file after processing
  fs.unlinkSync(file.path);

  processedFilenames.push({
    index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
    filename,
    url: `public/images/propertyplan/${filename}`,
  });

  return processedFilenames;
};

const amenityImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "amenity");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      if (isSvg) {
        // Copy SVG file
        fs.copyFileSync(file.path, outputPath);
        // await fs.promises.writeFile(outputPath, file.data);
      } else {
        // Resize non-SVG file
        await sharp(file.path)
          .resize(650, 400)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const bannerImageResize = async (req) => {

  const processedFilenames = [];
  await Promise.all(
    req.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "landing", filename);
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const outputDir = path.join("public", "images", "landing");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      if (isSvg) {
        const outputPath1 = path.join(outputDir, filename);

        // Copy SVG file
        fs.copyFileSync(file.path, outputPath1);
        // await fs.promises.writeFile(outputPath, file.data);
      } else {
        await sharp(file.path)
          .resize(1920, 1080)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      }

      // fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
// const featuredImageResizeAdd = async (req) => {
//  console.log("featuredImageResizeAdd")
// console.log(req)
//   const processedFilenames = [];
//   await Promise.all(
//     req.map(async (file) => {
//       // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
//       const filename =file.filename
//       const outputPath = path.join("public", "images", "property", filename);
//       const ext = path.extname(file.originalname).toLowerCase();
//       const isSvg = ext === '.svg';

//       const outputDir = path.join("public", "images", "property");
//         if (!fs.existsSync(outputDir)) {
//           fs.mkdirSync(outputDir, { recursive: true });
//         }

//       if (isSvg) {
//       const outputPath1 = path.join(outputDir, filename);

//         // Copy SVG file
//         fs.copyFileSync(file.path, outputPath1);
//         // await fs.promises.writeFile(outputPath, file.data);
//       } else {
//       await sharp(file.path)
//         .resize(1920, 1080)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);
//       }

//       // fs.unlinkSync(file.path); // delete original uploaded file

//       processedFilenames.push(filename);
//     })
//   );

//   return processedFilenames;
// };
const featuredImageResizeAdd = async (req) => {
  const processedFilenames = [];
  const outputDir = path.join("public", "images", "property");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.map(async (file) => {
      const filename = file.filename;
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === ".svg";
      const outputPath = path.join(outputDir, filename);

      try {
        // if (isSvg) {
        fs.copyFileSync(file.path, outputPath);
        // } else {
        //   await sharp(file.path, { failOnError: false }) // 👈 suppress decoding failure
        //     .resize(1920, 1080)
        //     .toFormat("jpeg")
        //     .jpeg({ quality: 90 })
        //     .toFile(outputPath);
        // }

        processedFilenames.push(filename);
      } catch (err) {
        console.error(`❌ Skipping file [${filename}]: ${err.message}`);
        // Optionally: notify frontend or log
      }
    })
  );

  return processedFilenames;


};
// const featuredImageResizeAddSite = async (req) => {
//  console.log("featuredImageResizeAddSite")
// console.log(req)
//   const processedFilenames = [];
//   await Promise.all(
//     req.map(async (file) => {
//       // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
//       const filename =file.filename
//       const outputPath = path.join("public", "images", "siteplan", filename);
//       const ext = path.extname(file.originalname).toLowerCase();
//       const isSvg = ext === '.svg';

//       const outputDir = path.join("public", "images", "siteplan");
//         if (!fs.existsSync(outputDir)) {
//           fs.mkdirSync(outputDir, { recursive: true });
//         }

//       if (isSvg) {
//       const outputPath1 = path.join(outputDir, filename);

//         // Copy SVG file
//         // fs.copyFileSync(file.path, outputPath1);
//         // await fs.promises.writeFile(outputPath, file.data);
//       } else {
//       await sharp(file.path)
//         .resize(1920, 1080)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);
//       }

//       // fs.unlinkSync(file.path); // delete original uploaded file

//       processedFilenames.push(filename);
//     })
//   );

//   return processedFilenames;
// };

const featuredImageResizeAddSite = async (req) => {
  const processedFilenames = [];
  const outputDir = path.join("public", "images", "siteplan");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.map(async (file) => {
      const filename = file.filename;
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === ".svg";
      const outputPath = path.join(outputDir, filename);

      try {
        // if (isSvg) {
        fs.copyFileSync(file.path, outputPath); // ✅ SVG copy restored
        // } else {
        //   await sharp(file.path, { failOnError: false }) // ✅ added
        //     .resize(1920, 1080)
        //     .toFormat("jpeg")
        //     .jpeg({ quality: 90 })
        //     .toFile(outputPath);
        // }

        processedFilenames.push(filename);
      } catch (err) {
        console.error(`⚠️ Skipped file ${filename}: ${err.message}`);
        // You can optionally collect skipped files
      }
    })
  );

  return processedFilenames;
};
const featuredImageResizeAddMaster = async (req) => {
  const processedFilenames = [];
  const outputDir = path.join("public", "images", "masterplan");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.map(async (file) => {
      const filename = file.filename;
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === ".svg";
      const outputPath = path.join(outputDir, filename);

      try {
        // if (isSvg) {
        fs.copyFileSync(file.path, outputPath); // ✅ SVG copy restored
        // } else {
        //   await sharp(file.path, { failOnError: false }) // ✅ added
        //     .resize(1920, 1080)
        //     .toFormat("jpeg")
        //     .jpeg({ quality: 90 })
        //     .toFile(outputPath);
        // }

        processedFilenames.push(filename);
      } catch (err) {
        console.error(`⚠️ Skipped file ${filename}: ${err.message}`);
        // You can optionally collect skipped files
      }
    })
  );

  return processedFilenames;
};
const aboutImageResize = async (req) => {

  if (!req.files.aboutimage || !Array.isArray(req.files.aboutimage)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.aboutimage.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "landing", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const gallerySelectedImgsResize = async (req) => {

  // if (!req.files.gallerySelectedImgs || !Array.isArray(req.files.gallerySelectedImgs)) return;

  const processedFilenames = [];
  await Promise.all(
    req.map(async (file) => {

      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename = file.filename
      const outputPath = path.join("public", "images", "landing", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push("public/images/landing/" + filename);
    })
  );

  return processedFilenames;
};
const propertySelectedImgsResizeadd = async (req) => {

  // if (!req.files.gallerySelectedImgs || !Array.isArray(req.files.gallerySelectedImgs)) return;


  // const processedFilenames = [];
  // await Promise.all(
  //   req.map(async (file) => {

  //     // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
  //     const filename =file.filename
  //     const outputPath = path.join("public", "images", "propertyimage", filename);

  //     await sharp(file.path)
  //       .resize(750, 450)
  //       .toFormat("jpeg")
  //       .jpeg({ quality: 90 })
  //       .toFile(outputPath);

  //     fs.unlinkSync(file.path); // delete original uploaded file

  //     processedFilenames.push("public/images/propertyimage/"+filename);
  //   })
  // );

  // return processedFilenames;
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "propertyimage", "amenity");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      // if (isSvg) {
      // Copy SVG file
      fs.copyFileSync(file.path, outputPath);
      // await fs.promises.writeFile(outputPath, file.data);
      // } else {
      //   // Resize non-SVG file
      //   await sharp(file.path)
      //     .resize(650, 400)
      //     .toFormat('jpeg')
      //     .jpeg({ quality: 90 })
      //     .toFile(outputPath);
      // }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const groupFilesByFieldname = (files) => {
  const fileMap = {};
  files.forEach(file => {
    if (!fileMap[file.fieldname]) {
      fileMap[file.fieldname] = [];
    }
    fileMap[file.fieldname].push(file);
  });
  return fileMap;
};
const groupFilesByFieldname2 = (files) => {
  const fileMap = {};
  files.forEach(file => {
    // Normalize fieldname like gallerySelectedImgs[0] → gallerySelectedImgs
    const baseField = file.fieldname.replace(/\[\d+\]/, '');

    if (!fileMap[baseField]) {
      fileMap[baseField] = [];
    }
    fileMap[baseField].push(file);
  });
  return fileMap;
};
const processUploadedPDFs = async (req) => {

  if (!req.files.pdffile || !Array.isArray(req.files.pdffile)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.pdffile.map(async (file) => {

      const filename = file.filename;
      const outputPath = path.join("public", "images", "pdffile", filename);

      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Move file from temp location to target
      fs.renameSync(file.path, outputPath);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const processUploadedPDFsadd = async (req) => {

  // if (!req.files.pdffile || !Array.isArray(req.files.pdffile)) return;

  const processedFilenames = [];

  await Promise.all(
    req.map(async (file) => {

      const filename = file.filename;
      const outputPath = path.join("public", "images", "pdffile", filename);

      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Move file from temp location to target
      fs.renameSync(file.path, outputPath);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
module.exports = { uploadPhoto, productImgResize, blogImgResize, manufacturerImgResize, robotImgResize, featuredImageResize, sitePlanResize, masterPlanResize, photoUploadMiddleware, testimonialImgResize, propertySelectedImgsResize, cityImgResize, processFloorPlanImages, photoUploadMiddleware1, processFloorPlanImagesGet, amenityImgResize, bannerImageResize, aboutImageResize, gallerySelectedImgsResize, groupFilesByFieldname, groupFilesByFieldname2, processLandingPlanGet, processLandingPlan, processUploadedPDFs, processFloorPlanImagesAdd, featuredImageResizeAdd, featuredImageResizeAddSite, propertySelectedImgsResizeadd, processUploadedPDFsadd, featuredImageResizeAddMaster, locationImgResize, categoryImgResize };
