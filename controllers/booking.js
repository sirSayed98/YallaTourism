const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

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
        success_url: `${req.protocol}://${req.get('host')}/?tour=${
            req.params.tourID
            }&user=${req.user.id}&price=${tour.price}`,
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
                amount: tour.price * 100,
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

// @desc      Book Tour
// @route     Post /api/v1/booking/
// @access    Private
exports.createBookingCheckout = asyncHandler(async (req, res, next) => {
    //this only for developing ... change it later
    const { tour, user, price } = req.query;
    if (!tour || !user || !price)
        return next();
    await Booking.create({ tour, user, price });

    res.redirect(req.originalUrl.split('?')[0])
});



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