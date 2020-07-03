const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


//@desc       Register User
//@route      GET/api/v1/auth/register
//@access     public
exports.register = asyncHandler(async (req, res, next) => {
    const { password,confirmPassword } = req.body;

    if(password!==confirmPassword)
    return next(
        new ErrorResponse(`password and confirm password don't match`, 503)
    );
    //create user
    const user = await User.create(req.body);
    sendTokenResponse(user, 200, res);

})














// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE 
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};
