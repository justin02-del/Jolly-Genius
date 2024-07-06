// config/db.js
const mongoose = require('mongoose');
const mongourl = "mongodb://localhost:27017/JollyGenius";

const connectDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
