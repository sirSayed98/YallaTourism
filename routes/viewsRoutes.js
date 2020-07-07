const express = require('express');


const {
getOverview,
} = require('../controllers/viewsController');
const router = express.Router();


router.get('/', getOverview);
module.exports = router;    