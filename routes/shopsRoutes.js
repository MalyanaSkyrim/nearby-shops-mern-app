const express = require('express');
const shopsController = require('../controllers/shopsController');
const getAuth = require('../middleware/getUser');

const router = express.Router();

const isAuth = require('../middleware/is-Auth');

router.get('/nearbyshops', getAuth, shopsController.getNearbyShops);

router.post('/likedshops', isAuth, shopsController.addLikedShop);

router.post('/dislikedshops', isAuth, shopsController.addDisLikedShop);

router.get('/favoriteshops', isAuth, shopsController.getFavoriteShops);

router.delete('/favoriteshops/:id', isAuth, shopsController.removeFromFavorite);

module.exports = router;
