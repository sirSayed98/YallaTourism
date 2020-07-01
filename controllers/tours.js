const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour')

// @desc      Get all tours
// @route     GET /api/v1/tours
// @access    Public
exports.getTours = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get single tour
// @route     GET /api/v1/tours/:id
// @access    Public
exports.getTour = asyncHandler(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(
            new ErrorResponse(`Tour not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ success: true, data: tour });
});

// @desc      Create new Tour
// @route     POST /api/v1/tours
// @access    Private
exports.createTour = asyncHandler(async (req, res, next) => {
    const tour = await Tour.create(req.body);
    res.status(201).json({
        success: true,
        data: tour
    });
});

// @desc      Update tour
// @route     PUT /api/v1/tour/:id
// @access    Private
exports.updateTour = asyncHandler(async (req, res, next) => {
    let tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(
            new ErrorResponse(`tour not found with id of ${req.params.id}`, 404)
        );
    }

    tour = await Tour.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: tour });
});

// @desc      Delete tour
// @route     DELETE /api/v1/tours/:id
// @access    Private
exports.deleteTour = asyncHandler(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(
            new ErrorResponse(`tour not found with id of ${req.params.id}`, 404)
        );
    }

    tour.remove();
    res.status(200).json({ success: true, data: {} });
});

