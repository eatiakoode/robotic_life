const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    // Fixed: Use the correct database name where your data exists
    const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/TheBotsWorld';
    
    const conn = mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // optional but good to include
    });

    console.log("Database Connected Successfully: " + MONGODB_URL);
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;


