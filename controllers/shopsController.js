const axios = require('axios');

exports.getNearbyShops = async (req, res, next) => {
  const { lat, long } = req.query;

  try {
    const response = await axios.get(
      `https://places.demo.api.here.com/places/v1/discover/here?at=${lat},${long}&app_id=cT6MO7MXFbSOW0LAA9lI&app_code=f_35tuF43XbcNa0cuhMASw&cat=shop`
    );

    return res.json({ items: response.data.results.items });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
