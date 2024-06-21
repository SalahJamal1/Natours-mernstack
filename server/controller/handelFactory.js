const { Appfeatures } = require('../utils/Appfeatures');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filters = {};
    if (req.params.tour) filters = { tour: req.params.tour };
    const query = new Appfeatures(req.query, Model.find(filters))
      .filter()
      .sort()
      .field()
      .page();

    const docs = await query.querys;
    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: docs,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError('we can not find the doc by this id', 404));
    }
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.updatetOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('we can not find the doc by this id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deletetOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('we can not find the doc by this id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
