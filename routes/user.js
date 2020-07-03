const express = require('express');

const {
    updateMe,
    deleteUser
} = require('../controllers/user');

const User = require('../models/User');
const { protect } = require('../middleware/auth');


const router = express.Router();

router
    .route('/')
    .put(protect, updateMe)
router
    .route('/')
    .delete(protect, deleteUser)
module.exports = router;    