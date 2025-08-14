const asyncHandler = require("express-async-handler");
const Material = require("../models/materialModel");

//create material
const createMaterial = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Material name is required");
  }

  const materialExists = await Material.findOne({ name: name.trim() });
  if (materialExists) {
    res.status(400);
    throw new Error("Material already exists");
  }

  const material = await Material.create({ name: name.trim() });
  res.status(201).json({
    message: "Material created successfully",
    data: material
  });
});

//get all materials
const getAllMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find().sort({ name: 1 });
  res.json(materials);
});

//get single material
const getMaterialById = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (!material) {
    res.status(404);
    throw new Error("Material not found");
  }

  res.json(material);
});

//update material
const updateMaterial = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const material = await Material.findById(req.params.id);
  if (!material) {
    res.status(404);
    throw new Error("Material not found");
  }

  if (name) material.name = name.trim();

  const updatedMaterial = await material.save();
  res.json({
    message: "Material updated successfully",
    data: updatedMaterial
  });
});

//delete material
const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    res.status(404);
    throw new Error("Material not found");
  }

  await material.deleteOne();
  res.json({ message: "Material deleted successfully" });
});

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial
};