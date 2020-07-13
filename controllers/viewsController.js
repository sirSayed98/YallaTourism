const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tour = require('../models/Tour');
const Review = require('../models/Review');

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking')
        res.locals.alert =
            "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
    next();
};

//@desc       Get ALL Tours
//@route      /
//@access     Public
exports.getOverview = asyncHandler(async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();
    // 3) Build template & Render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

//@desc       Get Tour
//@route      /tour/:slug
//@access     Public
exports.getTour = asyncHandler(async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate(
        {
            path: 'guides',
            select: '-__v -passwordChangedAt'
        }
    );
    if (!tour) {
        return res.status(404).render('error', {
            title: `404 page`,
            msg: `There is no tour with that name ${req.params.slug}`

        });

    };
    const reviews = await Review.find({ tour: tour._id }).populate('user');

    // 2)  Build template & Render template using data from 1)
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour,
        reviews
    });
});


//@desc       Login Page
//@route      /login
//@access     Public
exports.getLoginForm = asyncHandler(async (req, res, next) => {
    res.status(200).render('login', {
        title: `Login into Your Account`
    });
});

//@desc       Sign UP
//@route      /Register
//@access     Public
exports.getRegisterForm = asyncHandler(async (req, res, next) => {
    res.status(200).render('signUp', {
        title: `Sign Up`
    });
});

//@desc       Home Profile
//@route      /profile
//@access     private
exports.getProfile = asyncHandler(async (req, res, next) => {
    res.status(200).render('account', {
        title: 'Your account'
    });

});