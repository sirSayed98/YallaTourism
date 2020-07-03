const express = require('express');

const {
    register,
    login
} = require('../controllers/auth');

const User = require('../models/User');

const router = express.Router();

router
    .route('/register')
    .post(register)

router
    .route('/login')
    .post(login)



module.exports = router;