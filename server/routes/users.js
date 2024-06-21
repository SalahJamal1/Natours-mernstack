const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  delteUser,
  Me,
  getCurrentuser,
} = require('../controller/users');
const {
  signup,
  login,
  forgetpassword,
  restpassword,
  updateMyPassword,
  protect,
  updateMe,
  uploadPhoto,
  resize,
  deleteMe,
  logout,
  restrictTo,
} = require('../controller/Authorization');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, Me, getCurrentuser);
router.route('/forgetpassword').post(forgetpassword);
router.route('/updateMyPassword').patch(protect, updateMyPassword);
router.route('/updateMe').patch(protect, uploadPhoto, resize, updateMe);
router.route('/deleteMe').patch(protect, deleteMe);
router.route('/restpassword/:token').patch(restpassword);
router.use(protect, restrictTo('admin'));
router.route('/').get(getUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(delteUser);
module.exports = router;
