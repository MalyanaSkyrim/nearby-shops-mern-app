const express = require('express');
const shopsController = require('../controllers/shopsController');

const router = express.Router();

router.get('/nearbyshops', shopsController.getNearbyShops);

module.exports = router;
