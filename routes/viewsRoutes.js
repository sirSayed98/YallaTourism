const express = require('express');


const {
    getOverview,
    getTour,
    getLoginForm,
} = require('../controllers/viewsController');

const router = express.Router();
const { isLoggedIn } = require('../middleware/auth');

router.get('/',isLoggedIn,getOverview);
router.get('/tour/:slug',isLoggedIn,getTour);
router.get('/login', isLoggedIn,getLoginForm);
module.exports = router;    