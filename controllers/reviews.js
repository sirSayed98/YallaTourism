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
    if (!req.body.tour) req.body.tour = req.params.tourID;
    if (!req.body.user) req.body.user = req.user.id;
    
    const review_obj = await Review.create(req.body);
    res.status(201).json({
        success: true,
        data: review_obj
    });
});