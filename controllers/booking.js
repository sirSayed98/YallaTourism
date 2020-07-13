const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const User = require('../models/User');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// @desc      BOOK TOUR
// @route     GET /api/v1/booking/checkout-session/:tourID
// @access    Public
exports.getCheckoutSession = asyncHandler(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourID);

    if (!tour) {
        return next(
            new ErrorResponse(`Tour with id of ${req.params.id} not found`, 404)
        );
    }
    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourID,
        line_items: [
            {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [
                    `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
                ],
                amount: tour.price * 100, //convert to cent
                currency: 'usd',
                quantity: 1
            }
        ]
    });

    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        data: session
    });
});

exports.webhookCheckout = (req, res, next) => {
    const signature = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed')
        createBookingCheckout(event.data.object);

    res.status(200).json({ received: true });
};

const createBookingCheckout = async session => {
    const tour = session.client_reference_id;
    const user = (await User.findOne({ email: session.customer_email })).id;
    const price = session.display_items[0].amount / 100;
    await Booking.create({ tour, user, price });
};


// @desc      Show Booked Tour
// @route     GET /api/v1/booking/my-tours
// @access    Public
exports.getMyTours = asyncHandler(async (req, res, next) => {
    const booking = await Booking.find({ user: req.user.id });
    const tourIDs = booking.map(el => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });
    res.status(200).render('overview', {
        title: 'My Tours',
        tours
    })
});