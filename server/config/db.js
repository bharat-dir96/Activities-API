// File for cdatabase connection
const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", false);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// This file is responsible for connecting to the MongoDB database using Mongoose.
