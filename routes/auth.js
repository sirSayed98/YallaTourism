const express = require('express');

const {
    register,
    login,
    forgetPassword,
    resetPassword,
    updatePassword
} = require('../controllers/auth');

const User = require('../models/User');
const { protect } = require('../middleware/auth');

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

router
    .route('/updatePassword')
    .put(protect,updatePassword)

module.exports = router;