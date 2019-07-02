const express = require('express');
const { check } = require('express-validator/check');
const authController = require('../controllers/authController');
const User = require('../models/User');
const isAuth = require('../middleware/is-Auth');
const router = express.Router();

router.get('/profile', isAuth, authController.getProfile);

router.post(
  '/signin',
  [
    check('username', 'username is required')
      .not()
      .isEmpty(),
    check('password')
      .isAlphanumeric()
      .withMessage('Password must be Alphanumeric')
      .isLength({ min: 6 })
      .withMessage('Password must contain more than 6 chars')
  ],
  authController.signin
);

router.post(
  '/signup',
  [
    check('username', 'username is required')
      .not()
      .isEmpty()
      .custom(async (username, { req }) => {
        const user = await User.findOne({
          username
        });
        if (user) {
          return Promise.reject('This username is already used');
        }
      }),
    check('email', 'Please enter a valid email')
      .isEmail()
      .custom(async (email, { req }) => {
        const user = await User.findOne({
          email
        });
        if (user) {
          return Promise.reject('This email is already used');
        }
      })
      .normalizeEmail(),
    check('password', 'Password must be Alphanumeric with 6 char in minimum')
      .isAlphanumeric()
      .isLength({ min: 6 }),
    check('confirmPassword').custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Password have to match');
      }
      return true;
    })
  ],
  authController.signup
);

router.post('/profile', isAuth, authController.updateProfile);

module.exports = router;
