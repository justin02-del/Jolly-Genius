// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');
const mongourl = process.env.MONGO_CONNECTION_STRING
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
