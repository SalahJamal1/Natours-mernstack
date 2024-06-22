const stripe = require('stripe')(process.env.STRIP);
const Booke = require('../models/booke');
const Tour = require('../models/tours');
const { catchAsync } = require('../utils/catchAsync');

exports.checkout = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourid);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://localhost:5173/?price=${tour.price}&tour=${tour._id}&user=${req.user._id}`,
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.user.id,
    metadata: {
      user: req.user._id.toString(),
      tour: tour.id.toString(),
      price: tour.price,
    },
    mode: 'payment',
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          currency: 'usd',
          product_data: {
            name: tour.name,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});

// exports.createBookecheckout = catchAsync(async (req, res, next) => {
//   const { price, tour, user } = req.query;
//   if (!price && !tour && !user) return next();

//   await Booke.create({ price, tour, user });

//   res.redirect(req.originalUrl.split('?')[0]);
// });
const createBookingCheckout = async (metadata) => {
  const { tour, user, price } = metadata;
  await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  if (!signature) return next();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    createBookingCheckout(session.metadata);
  }

  res.status(200).json({ received: true });
};
