const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');

exports.signin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: { id: user.id, username: user.username }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'user already exists' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      username,
      password: cryptedPassword
    });

    await user.save();
    const payload = {
      user: { id: user.id, username: user.username }
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findOne({ username: req.user.username }).select(
      '-password'
    );
    if (user) {
      return res.json({ user });
    } else {
      return res.status(400).json({ errors: [{ msg: "user doesn't exists" }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
