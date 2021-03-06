const axios = require('axios');
const User = require('../models/User');

exports.getNearbyShops = async (req, res, next) => {
  const { lat, long } = req.query;

  try {
    const response = await axios.get(
      `https://places.demo.api.here.com/places/v1/discover/around?at=${lat},${long}&app_id=cT6MO7MXFbSOW0LAA9lI&app_code=f_35tuF43XbcNa0cuhMASw&cat=shop`
    );

    if (!req.user) {
      console.log('user not exists yet');
      return res.json({ items: response.data.results.items });
    }
    console.log('user exists');
    const user = await User.findOne({ username: req.user.username });
    const likedShops = user.favoriteShops.map(shop => shop.id);

    const currentDate = new Date();

    const dislikedShops = user.dislikedShops
      .filter(
        shop => Math.abs(shop.disliked_at - currentDate) / (1000 * 60 * 60) < 2
      )
      .map(shop => shop.id);

    const nearbyShops = response.data.results.items.filter(
      shop => !likedShops.includes(shop.id) && !dislikedShops.includes(shop.id)
    );

    return res.json({ items: nearbyShops });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.addLikedShop = async (req, res, next) => {
  try {
    const shopData = req.body;
    // console.log(shopData);
    const user = await User.findOne({ username: req.user.username });
    user.favoriteShops.push(shopData);
    await user.save();
    return res.json({ likedShop: shopData });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
exports.addDisLikedShop = async (req, res, next) => {
  try {
    const shopData = req.body;
    const user = await User.findOne({ username: req.user.username });

    const date = new Date();
    user.dislikedShops.push({ ...shopData, disliked_at: date.toISOString() });
    await user.save();
    return res.json({ dislikedShop: shopData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.getFavoriteShops = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    return res.json({ likedShops: user.favoriteShops });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.removeFromFavorite = async (req, res, next) => {
  try {
    const shop_id = req.params.id;

    const user = await User.findOne({ username: req.user.username });
    const likedShops = user.favoriteShops.filter(shop => shop.id !== shop_id);

    user.favoriteShops = likedShops;
    await user.save();

    return res.json({ msg: 'shop is removed from favorite' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
