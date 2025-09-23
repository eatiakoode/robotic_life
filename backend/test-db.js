// Quick test script to check database connection and data
const mongoose = require('mongoose');

// Connect to MongoDB (adjust the URL to match your database)
const MONGODB_URL = 'mongodb://localhost:27017/ecommercesite';

async function testConnection() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Test Color collection
    const Color = require('./models/colorModel');
    const colors = await Color.find();
    console.log('🎨 Colors in database:', colors.length);
    colors.forEach(color => console.log(`  - ${color.name} (status: ${color.status})`));

    // Test Manufacturer collection
    const Manufacturer = require('./models/manufacturerModel');
    const manufacturers = await Manufacturer.find();
    console.log('🏭 Manufacturers in database:', manufacturers.length);
    manufacturers.forEach(mfg => console.log(`  - ${mfg.name} (status: ${mfg.status})`));

    // Test Robot collection (just count)
    const Robot = require('./models/robotModel');
    const robotCount = await Robot.countDocuments();
    console.log('🤖 Robots in database:', robotCount);

    // Test a sample robot with colors populated
    const sampleRobot = await Robot.findOne().populate('color', 'name').populate('manufacturer', 'name');
    if (sampleRobot) {
      console.log('🤖 Sample robot:', {
        title: sampleRobot.title,
        colors: sampleRobot.color.map(c => c.name),
        manufacturer: sampleRobot.manufacturer?.name
      });
    }

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔚 Disconnected from MongoDB');
  }
}

testConnection();
