const express = require('express');
const shopsController = require('../controllers/shopsController');

const router = express.Router();

const isAuth = require('../middleware/is-Auth');

router.get('/nearbyshops', shopsController.getNearbyShops);

module.exports = router;
