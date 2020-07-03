const express = require('express');

const {
    register,
    login,
    forgetPassword
} = require('../controllers/auth');

const User = require('../models/User');

const router = express.Router();

router
    .route('/register')
    .post(register)

router
    .route('/login')
    .post(login)

router
    .route('/forgetPassword')
    .post(forgetPassword)



module.exports = router;