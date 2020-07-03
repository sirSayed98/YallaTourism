const express = require('express');

const {
register
} = require('../controllers/auth');

const User = require('../models/User');

const router = express.Router();

router
    .route('/register')
    .post(register)
     



module.exports = router;