const express = require('express');

const {
    getCheckoutSession,
    getMyTours
} = require('../controllers/booking');


const { protect } = require('../middleware/auth');
const router = express.Router();



router
    .get('/checkout-session/:tourID', protect, getCheckoutSession);

router
    .get('/my-tours', protect, getMyTours)



module.exports = router;