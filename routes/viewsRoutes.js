const express = require('express');


const {
    getOverview,
    getTour,
    getLoginForm,
    getProfile,
} = require('../controllers/viewsController');
const { createBookingCheckout,getMyTours } = require('../controllers/booking');

const router = express.Router();
const { isLoggedIn, protectFront } = require('../middleware/auth');

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/profile', protectFront, getProfile);
router.get('/my-tours', protectFront, getMyTours);
module.exports = router;    