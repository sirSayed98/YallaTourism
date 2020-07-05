const express = require('express');

const {
   getReviews,
   createReview
} = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();


/* Basic CRUD*/
router
    .route('/')
    .get(advancedResults(Review, {
        path: 'user',
        select: '-__v -passwordChangedAt -createdAt'
    }),getReviews)
    .post(protect,authorize('user'),createReview);

    
module.exports = router;