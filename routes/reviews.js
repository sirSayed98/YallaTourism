const express = require('express');

const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReview
} = require('../controllers/reviews');


const { protect, authorize } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });


/* Basic CRUD*/
router
    .route('/')
    .get(getReviews)
    .post(protect, authorize('user'), createReview);

router
      .route('/:id')
      .get(getReview)
      .put(protect,authorize('admin','user'),updateReview)
      .delete(protect,authorize('admin','user'),deleteReview)  
module.exports = router;