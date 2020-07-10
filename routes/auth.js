const express = require('express');

const {
    register,
    login,
    forgetPassword,
    resetPassword,
    updatePassword,
    getMe,
    logout
} = require('../controllers/auth');


const { protect } = require('../middleware/auth');
const router = express.Router();

router
    .route('/register')
    .post(register)
router
    .route('/me')
    .get(protect, getMe)

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
    .put(protect, updatePassword)

router
    .get('/logout', logout);
module.exports = router;