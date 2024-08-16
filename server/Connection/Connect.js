const mongoose = require("mongoose");

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Connection Failed");
  }
};

module.exports = {
  connectDB,
};
