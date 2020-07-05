const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review')

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Create new Review
// @route     POST /api/v1/reviews
// @access    Private
exports.createReview = asyncHandler(async (req, res, next) => {
    console.log(req.user._id)
    const { rating, review, tour } = req.body;
    const review_obj = await Review.create({
        user: req.user._id,
        rating,
        tour,
        review,
    });
    res.status(201).json({
        success: true,
        data: review_obj
    });
});