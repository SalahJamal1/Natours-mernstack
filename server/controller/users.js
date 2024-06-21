const User = require('../models/users');
const { getAll, getOne, updatetOne, deletetOne } = require('./handelFactory');

exports.getUsers = getAll(User);
exports.getUser = getOne(User);
exports.getCurrentuser = getOne(User);
exports.updateUser = updatetOne(User);
exports.delteUser = deletetOne(User);

exports.Me = (req, res, next) => {
  if (!req.params.id) req.params.id = req.user._id;
  next();
};
