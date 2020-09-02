const de = require("dotenv").config();
const mongoose = require("mongoose");
const config = require("config");
const db = process.env.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongo DB Connected Successfully!!!");
  } catch (err) {
    console.log("err.message");
    process.exit(1);
  }
};

module.exports = connectDB;
