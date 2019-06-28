const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Shop', shopSchema);
