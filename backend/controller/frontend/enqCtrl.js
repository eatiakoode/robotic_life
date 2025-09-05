const Enquiry = require("../../models/enqModel");

const createEnquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const enquiry = new Enquiry({
      name,
      email,
      message,
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      data: enquiry,
    });
  } catch (error) {
    console.error("Error while creating enquiry:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createEnquiry };