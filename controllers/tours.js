const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour')
const multer = require('multer')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

exports.resizeTourImages = asyncHandler(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();

    // 1) Cover image
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`Public/img/tours/${req.body.imageCover}`);

    // 2) Images
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`Public/img/tours/${filename}`);
            req.body.images.push(filename);
        })
    );
    next();
});





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
    const tour = await Tour.findById(req.params.id).populate('reviews').populate(
        {
            path: 'guides',
            select: '-__v -passwordChangedAt'
        }
    );

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
    let avgRate = 4; //default value
    if (req.query.avgRate)
        avgRate = req.query.avgRate * 1;
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: avgRate } }
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

// @desc      GetTourWithin
// @route     GET /tours-within/:distance/center/:latlng,latiude/unit/:unit
// @access    Public


exports.getTourWithin = asyncHandler(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(
            new AppError(
                'Please provide latitutr and longitude in the format lat,lng.',
                400
            )
        );
    }

    const tours = await Tour.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: tours
    });
});


//tmp 
// exports.deleteTour = asyncHandler(async (req, res, next) => {
// });



