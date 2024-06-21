const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './config.env' });
exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DBS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB successfully running');
  } catch (err) {
    console.log(err.message);
  }
};
