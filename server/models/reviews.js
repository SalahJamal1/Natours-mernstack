const mongoose = require('mongoose');
const Tour = require('./tours');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'please enter the review'],
    trim: true,
  },
  rating: {
    type: Number,
    max: [5, 'the {VALUE} incorrect'],
    min: [1, 'the {VALUE} incorrect'],
    required: [true, 'please enter the review'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'please enter the user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',

    required: [true, 'please enter the tour'],
  },
});
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'photo name email',
  });
  next();
});
reviewSchema.statics.AvgRating = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        num: { $sum: 1 },
        avg: { $avg: '$rating' },
      },
    },
  ]);
  if (tourId) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avg,
      ratingsQuantity: stats[0].num,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.AvgRating(this.tour);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  doc.constructor.AvgRating(doc.tour);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
