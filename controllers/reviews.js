const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review')

// @desc      Get all reviews
// @route     GET /api/v1/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    let filter={}
    if (req.params.tourID) filter={tour:req.params.tourID}
    const reviews= await Review.find(filter).populate({
        path: 'user',
        select: '-__v -passwordChangedAt -createdAt'
    });
    res.status(200).json({ success: true,count:reviews.length ,data:reviews})
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

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private/user-admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc      Update Review
// @route     PUT /api/v1/reviews/:id
// @access    Private/user-admin
exports.updateReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: review
    });
  });
// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'user',
        select: '-__v -passwordChangedAt -createdAt'
    });
    if (!review) {
        return next(
            new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ success: true, data: review});
});
