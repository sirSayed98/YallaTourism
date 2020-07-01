const express = require('express');

const {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
} = require('../controllers/tours');

const Tour = require('../models/Tour');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();


router
    .route('/')
    .get(advancedResults(Tour), getTours)
    .post(createTour);

router
      .route('/top-five-tours')
      .get(aliasTopTours,advancedResults(Tour),getTours)

router
      .route('/:id')
      .put(updateTour)
      .delete(deleteTour)
      .get(getTour)      
     



module.exports = router;