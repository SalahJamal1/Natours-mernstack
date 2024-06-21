const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  delteReview,
  createReview2,
} = require('../controller/reviews');
const { protect } = require('../controller/Authorization');

router.use(protect);
router.route('/').get(getReviews).post(createReview2, createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(delteReview);
module.exports = router;
