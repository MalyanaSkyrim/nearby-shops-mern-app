const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteShops: [
    {
      shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
      }
    }
  ],

  dislikedShops: [
    {
      shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
