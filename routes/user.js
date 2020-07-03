const express = require('express');

const {
    updateMe
} = require('../controllers/user');

const User = require('../models/User');
const { protect } = require('../middleware/auth');


const router = express.Router();

router
    .route('/')
    .put(protect, updateMe)
module.exports = router;    