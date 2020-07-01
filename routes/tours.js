const express = require('express');
const {

} = require('../controllers/tours');

const Tour = require('../models/Tour');


const router = express.Router();


router
  .route('/')
  

router
  .route('/:id')
  .get()


module.exports = router;