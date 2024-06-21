const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    startLocation: {
      description: {
        trim: true,
        type: String,
      },
      type: {
        trim: true,
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: {
        trim: true,
        type: String,
      },
    },
    duration: Number,
    ratingsAverage: {
      type: Number,
      max: [5, 'the {VALUE} is not correct'],
      min: [0, 'the {VALUE} is not correct'],
      set: (value) => Math.floor(value * 10) / 10,
    },
    ratingsQuantity: Number,
    images: [String],
    startDates: [Date],
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'please enter the name'],
      maxlength: [40, 'the {VALUE} is not correct'],
      minlength: [8, 'the {VALUE} is not correct'],
    },
    maxGroupSize: Number,
    difficulty: {
      type: String,
      trim: true,
      enum: {
        values: ['medium', 'easy', 'difficult'],
        message: 'the {VALUE} is not defin',
      },
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    price: Number,
    priceDisount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'the {VALUE} is high than price',
      },
    },
    summary: { type: String, trim: true },
    description: { type: String, trim: true },
    imageCover: { type: String, trim: true },
    locations: [
      {
        description: {
          trim: true,
          type: String,
        },
        type: {
          trim: true,
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        day: Number,
      },
    ],
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: 'name photo role',
  }).populate('reviews');

  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
