const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './config.env' });
exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DBS);
    console.log('DB successfully running');
  } catch (err) {
    console.log(err.message);
  }
};
