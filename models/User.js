const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,

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
