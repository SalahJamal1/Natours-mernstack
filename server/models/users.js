const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'please enter the name'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'please enter the email'],
    unique: true,
    validate: [validator.isEmail, 'please enter the correct email'],
  },
  role: {
    type: String,
    trim: true,
    default: 'user',
    enum: ['user', 'admin', 'guide', 'lead-guide'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
    trim: true,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'please enter the password'],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'the password is not match',
    },
    // required: [true, 'please enter the passwordConfirm'],
  },
  passwordChangeAt: Date,
  resetpasswordToken: String,
  resetpasswordTokenAt: Date,
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.Login = async (password, userPass) => {
  return await bcryptjs.compare(password, userPass);
};
userSchema.methods.Protect = async (JWTIAT) => {
  if (this.passwordChangeAt) {
    const change = parseInt(this.passwordChangeAt / 1000, 10);
    return JWTIAT < change;
  }
  return false;
};
userSchema.methods.Forgetpassword = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetpasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetpasswordTokenAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
