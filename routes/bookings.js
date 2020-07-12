const express = require('express');

const {
    getCheckoutSession
} = require('../controllers/booking');


const { protect } = require('../middleware/auth');
const router = express.Router();



router
.get('/checkout-session/:tourID',protect,getCheckoutSession);




module.exports = router;