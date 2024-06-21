const fs = require('fs');
const Tour = require('../models/tours');
const Review = require('../models/reviews');
const User = require('../models/users');
const { connect } = require('../utils/database');
connect();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf8'),
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    await Review.create(reviews);
    await User.create(users);
    console.log('data created 👍');
    process.exit(1);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log('data deleted 💥');
    process.exit(1);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
