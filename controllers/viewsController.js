const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour');

exports.getOverview = asyncHandler(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  // 3) Build template & Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});
