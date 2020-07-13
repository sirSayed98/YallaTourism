const express = require('express');

const {
    getMyTours,
    getCheckoutSession
} = require('../controllers/booking');


const { protect } = require('../middleware/auth');
const router = express.Router();



router
    .get('/checkout-session/:tourID', protect, getCheckoutSession);

router
    .get('/my-tours', protect, getMyTours)



module.exports = router;