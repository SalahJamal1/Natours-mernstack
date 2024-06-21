const Review = require('../models/reviews');
const {
  getAll,
  createOne,
  getOne,
  updatetOne,
  deletetOne,
} = require('./handelFactory');

exports.getReviews = getAll(Review);
exports.createReview = createOne(Review);
exports.getReview = getOne(Review);
exports.updateReview = updatetOne(Review);
exports.delteReview = deletetOne(Review);

exports.createReview2 = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tour;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
