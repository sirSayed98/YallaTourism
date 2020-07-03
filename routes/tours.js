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
    .get(advancedResults(Tour), getTours)
    .post(createTour);
router
    .route('/:id')
    .put(updateTour)
    .delete(deleteTour)
    .get(getTour)      




router
      .route('/year/:year')
      .get(getToursInYear)      

    
module.exports = router;