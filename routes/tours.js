const express = require('express');

const {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
    getToursInYear,
    getTourWithin,
    uploadTourImages,
    resizeTourImages
} = require('../controllers/tours');

const Tour = require('../models/Tour');
const advancedResults = require('../middleware/advancedResults');
const reviewRouter = require('./reviews')
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

/* Review Routers */

router.use('/:tourID/reviews', reviewRouter);

/* Special routes*/
router
    .route('/top-five-tours')
    .get(aliasTopTours, advancedResults(Tour), getTours)

router
    .route('/tour-stats')
    .get(getTourStats)
router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(getTourWithin);

/* Basic CRUD*/
router
    .route('/')
    .get(advancedResults(Tour, {
        path: 'guides',
        select: '-__v -passwordChangedAt'
    }), getTours)
    .post(protect, authorize('admin', 'lead-guide'), createTour);
router
    .route('/:id')
    .get(getTour)
    .put(protect, authorize('admin', 'lead-guide'), uploadTourImages, resizeTourImages, updateTour)
    .delete(protect, authorize('admin', 'lead-guide'), deleteTour)




router
    .route('/year/:year')
    .get(protect, authorize('admin', 'lead-guide', 'guide'), getToursInYear)


module.exports = router;