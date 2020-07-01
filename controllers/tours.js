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


// @desc      Get top five tours
// @route     GET /api/v1/tours/top-five-tours
// @access    public
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.select = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

// @desc      Get statistics about tours according to avgRate
// @route     GET /api/v1/tours/tour-stats
// @access    public
exports.getTourStats = asyncHandler(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: req.query.avgRate * 1 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },    //to increment counter for each tour
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }  //ascending
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
    ]);
    if (!stats) {
        return next(
            new ErrorResponse(`failed to get statistics`, 404)
        );
    }
    else {
        res.status(200).json({
            success: true,
            data: stats
        });
    }
});


// @desc      Get statistics for tours by year
// @route     GET/api/v1/tours/year/:year
// @access    Public
exports.getToursInYear = asyncHandler(async (req, res, next) => {
    const year = req.params.year * 1; // 2021
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStarts: -1 } //decending
        },
        {
            $limit: 12  //12 month in year
        }
    ]);
    if (!year) {
        return next(
            new ErrorResponse(`failed to get tours in year ${year}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: plan

    });

});

//tmp 

// // @desc      Delete tour
// // @route     DELETE /api/v1/tours/:id
// // @access    Private
// exports.deleteTour = asyncHandler(async (req, res, next) => {

// });



