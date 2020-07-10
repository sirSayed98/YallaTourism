const express = require('express');

const {
    updateMe,
    deleteUser,
    getUsers,
    createUser,
    updateUser,
    uploadPhoto,
    resizeUserPhoto
} = require('../controllers/user');

const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const router = express.Router();

router.use(protect); //apply on all routes

router
    .route('/updateMe')
    .put(uploadPhoto, resizeUserPhoto, updateMe)

router.use(authorize('admin'))

/* Admin CRUD */
router
    .route('/')
    .get(advancedResults(User), getUsers)

router
    .route('/')
    .post(createUser)
router
    .route('/:id')
    .delete(deleteUser)
router
    .route('/:id')
    .put(updateUser)

module.exports = router;    