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
  birthday: {
    type: Date
  },
  phoneNumber: {
    type: String
  },
  photo: {
    originalPhoto: {
      type: String
    },
    croppedPhoto: {
      type: String
    },
    crop: {}
  },
  prefix: {
<<<<<<< HEAD
    type: String
=======
    type: String,
    default: "212"
>>>>>>> c390b41... bug fix, datepicker and update profile
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
    },
    { _id: false }
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
    },
    { _id: false }
  ]
});

module.exports = mongoose.model("User", userSchema);
