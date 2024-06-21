const express = require('express');
const reviews = require('./reviews');
const {
  getTours,
  createtour,
  getTour,
  updateTour,
  delteTour,
  getslugTour,
} = require('../controller/tours');
const { protect, restrictTo } = require('../controller/Authorization');
// const { createBookecheckout } = require('../controller/book');
const router = express.Router();

router.use('/:tour/reviews', reviews);

router.route('/').get(getTours).post(protect, restrictTo('admin'), createtour);
router.route('/tour/:slug').get(getslugTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin'), updateTour)
  .delete(protect, restrictTo('admin'), delteTour);
module.exports = router;
