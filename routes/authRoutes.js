const express = require('express');
const { check } = require('express-validator/check');
const authController = require('../controllers/authController');
const User = require('../models/User');

const router = express.Router();
router.post(
  '/signin',
  [
    check('email', 'Please enter a valid email')
      .isEmail()
      .normalizeEmail(),
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
    check('nickname', 'nickname is required')
      .not()
      .isEmpty()
      .custom(async (nickname, { req }) => {
        const user = await User.findOne({
          nickname
        });
        if (user) {
          return Promise.reject('This nickname is already used');
        }
      })
      .normalizeEmail(),
    check('email', 'Please enter a valid email')
      .isEmail()
      .custom(async (email, { req }) => {
        const user = await User.findOne({
          email
        });
        if (user) {
          return Promise.reject('This email is already used');
        }
      }),
    check('password', 'Password must be Alphanumeric with 6 char in minimum')
      .isAlphanumeric()
      .isLength({ min: 6 }),
    check('confirmPassword').custom((confirmPasswoed, { req }) => {
      if (confirmPasswoed !== req.body.password) {
        throw new Error('Password have to match');
      }
      return true;
    })
  ],
  authController.signup
);

module.exports = router;
