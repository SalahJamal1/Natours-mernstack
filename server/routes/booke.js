const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controller/Authorization');
const { checkout } = require('../controller/book');

router.route('/').get().post();
router.route('/checkout-session/:tourid').get(protect, checkout);
router.route('/checkout')

module.exports = router;
