const { catchAsync } = require('../utils/catchAsync');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { AppEmail } = require('../utils/AppEmail');
const { AppError } = require('../utils/AppError');
const crypto = require('crypto');
const sharp = require('sharp');
const multer = require('multer');
createToken = (user, res, req) => {
  const token = jwt.sign({ id: user._id }, process.env.JWTF, {
    expiresIn: process.env.JWTE,
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: true,
  });
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const url = `${req.protocol}://${req.get('host')}/`;
  await new AppEmail(user, url).sendWelcom();

  createToken(user, res, req);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('The user is not exist', 404));
  }
  const x = await user.Login(password, user.password);
  if (!x) {
    return next(new AppError('The password id wrong', 404));
  }

  createToken(user, res, req);
});

exports.protect = catchAsync(async (req, res, next) => {
  //check token
  console.log(req.cookies);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('Protect:You are not login', 404));
  }
  // vertify token
  const x = jwt.verify(token, process.env.JWTF);
  const user = await User.findById(x.id);
  if (!user) {
    return next(new AppError('Protect: The user is not exist', 404));
  }

  if (await user.Protect(x.iat)) {
    return next(new AppError('Protect: The password is changed', 404));
  }

  req.user = user;
  res.locals.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('RestrictTo: you can not access for this data', 404),
      );
    }
    next();
  };
};

exports.forgetpassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('forgetpassword: we can not find the user', 404));
  }

  const resetToken = await user.Forgetpassword();
  // const url = `${req.protocol}://${req.get('host')}/restpassword/${resetToken}`;
  const url = `http://localhost:5173/restpassword/${resetToken}`;
  await user.save({ validateBeforeSave: false });
  try {
    await new AppEmail(user, url).sendReset();
    res.status(200).json({
      status: 'success',
      message: 'The Email successfully sent',
    });
  } catch (err) {
    user.resetpasswordToken = undefined;
    user.resetpasswordTokenAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(err.message, 404));
  }
});

exports.restpassword = catchAsync(async (req, res, next) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetpasswordToken: resetToken,
    resetpasswordTokenAt: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('The url expierd', 404));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetpasswordToken = undefined;
  user.resetpasswordTokenAt = undefined;
  await user.save();
  createToken(user, res, req);
});
exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!(await user.Login(req.body.currentpassword, user.password))) {
    return next(new AppError('The current password is wrong', 404));
  }
  console.log(req.body);
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('The password is not match', 404));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createToken(user, res, req);
});

const filter = (body, ...allow) => {
  let x = {};
  Object.keys(body).forEach((el) => {
    if (allow.includes(el)) x[el] = body[el];
  });
  return x;
};

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('No an Image for this type', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single('photo');
exports.resize = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.file = `user-${Date.now()}-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../../client/public/img/users/${req.body.file}`);
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const x = filter(req.body, 'name', 'email');
  if (req.body.file) x.photo = req.body.file;
  const user = await User.findByIdAndUpdate(req.user.id, x, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'logout', {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: 'None',
  });
  res.set('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({
    status: 'success',
  });
});
