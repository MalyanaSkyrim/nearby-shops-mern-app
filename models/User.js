const mongoose = require("mongoose");

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
      id: {
        type: String,
        require: true,
        unique: true
      },
      shopName: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      imgUrl: {
        type: String
      }
    }
  ],

  dislikedShops: [
    {
      id: {
        type: String,
        require: true,
        unique: true
      },
      shopName: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      imgUrl: {
        type: String
      },
      disliked_at: {
        type: Date,
        require: true
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
