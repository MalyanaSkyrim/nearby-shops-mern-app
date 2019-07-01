const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    const { user } = decoded;
    req.user = user;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};
