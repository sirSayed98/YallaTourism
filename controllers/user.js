const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
  

//@desc       Update date
//@route      Put/api/v1/users
//@access     private
exports.updateMe = asyncHandler(async (req, res, next) => {
    // 1) Create error if user POSTs password data

    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new ErrorResponse(`This route is not for password updates. Please use auth/updatePassword.`, 400)
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });

})