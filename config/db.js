const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Database Connected... ');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
