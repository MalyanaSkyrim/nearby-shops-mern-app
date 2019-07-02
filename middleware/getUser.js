const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    return next();
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    const { user } = decoded;
    req.user = user;
  } catch (err) {
    console.log(err.message);
  }

  next();
};
