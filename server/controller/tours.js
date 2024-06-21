const Tour = require('../models/tours');
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const {
  getAll,
  createOne,
  getOne,
  updatetOne,
  deletetOne,
} = require('./handelFactory');

exports.getTours = getAll(Tour);
exports.createtour = createOne(Tour);
exports.getTour = getOne(Tour);
exports.updateTour = updatetOne(Tour);
exports.delteTour = deletetOne(Tour);

exports.getslugTour = catchAsync(async (req, res, next) => {
  const doc = await Tour.findOne({ slug: req.params.slug });
  if (!doc) {
    return next(new AppError('No tour for this slug'));
  }
  res.status(200).json({
    status: 'success',
    data: doc,
  });
});
