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
} = require('../controllers/tours');

const Tour = require('../models/Tour');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

/* Special routes*/    
router
      .route('/top-five-tours')
      .get(aliasTopTours,advancedResults(Tour),getTours)

router
      .route('/tour-stats')
      .get(getTourStats)    

/* Basic CRUD*/
router
    .route('/')
    .get(advancedResults(Tour, {
        path: 'guides',
        select: '-__v -passwordChangedAt'
    }), getTours)
    .post(createTour);
router
    .route('/:id')
    .get(getTour)      
    .put(updateTour)
    .delete(deleteTour)




router
      .route('/year/:year')
      .get(getToursInYear)      

    
module.exports = router;