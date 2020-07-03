const express = require('express');

const {
    updateMe,
    deleteUser,
    getUsers,
    createUser,
    updateUser
} = require('../controllers/user');

const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.use(protect); //apply on all routes

router
    .route('/updateMe')
    .put(updateMe)

/* Admin CRUD */    
router
    .route('/')
    .get(authorize('admin'), advancedResults(User), getUsers)

router
    .route('/')
    .post(authorize('admin'), createUser)
router
    .route('/:id')
    .delete(authorize('admin'), deleteUser)
router
    .route('/:id')
    .put(authorize('admin'),updateUser)

module.exports = router;    