const mongoose = require('mongoose');
const Faq = require('../models/faqModel');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample FAQs data
const sampleFAQs = [
  {
    title: "What are the key features of this robot?",
    description: "This robot comes with advanced AI capabilities, autonomous navigation, and human-like interaction features. It includes voice recognition, object detection, and can perform various tasks based on your needs.",
    robotid: "68b825c5c498cc9e857afac2", // Replace with actual robot ID
    status: true
  },
  {
    title: "What is the battery life and charging time?",
    description: "The robot has a battery life of 8-12 hours depending on usage intensity. It takes approximately 2-3 hours to fully charge from empty to 100%.",
    robotid: "68b825c5c498cc9e857afac2", // Replace with actual robot ID
    status: true
  },
  {
    title: "What operating systems and software does it support?",
    description: "This robot runs on a custom Linux-based operating system and supports various programming languages including Python, C++, and JavaScript for custom applications.",
    robotid: "68b825c5c498cc9e857afac2", // Replace with actual robot ID
    status: true
  },
  {
    title: "Is there a warranty and support available?",
    description: "Yes, the robot comes with a 2-year manufacturer warranty covering hardware defects. Technical support is available via email, phone, and online documentation.",
    robotid: "68b825c5c498cc9e857afac2", // Replace with actual robot ID
    status: true
  },
  {
    title: "Can I customize the robot's appearance and functionality?",
    description: "Absolutely! The robot supports modular design allowing you to customize its appearance, add new sensors, and program custom behaviors using our SDK.",
    robotid: "68b825c5c498cc9e857afac2", // Replace with actual robot ID
    status: true
  }
];

// Function to add sample FAQs
const addSampleFAQs = async () => {
  try {
    await connectDB();
    
    // Clear existing FAQs for this robot (optional)
    // await Faq.deleteMany({ robotid: "68b825c5c498cc9e857afac2" });
    
    // Add sample FAQs
    const createdFAQs = await Faq.insertMany(sampleFAQs);
    console.log(`Successfully added ${createdFAQs.length} sample FAQs`);
    
    // Display the created FAQs
    createdFAQs.forEach((faq, index) => {
      console.log(`${index + 1}. ${faq.title}`);
    });
    
  } catch (error) {
    console.error('Error adding sample FAQs:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
addSampleFAQs();
