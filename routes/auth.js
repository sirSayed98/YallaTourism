const express = require('express');

const {
    register,
    login,
    forgetPassword,
    resetPassword
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

router
    .route('resetpassword/:resettoken')
    .put(resetPassword)


module.exports = router;