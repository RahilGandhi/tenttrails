const express = require('express');
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/reviews');
const Campground = require('../models/campground');
const reviews = require('../controllers/reviews')
const { isLoggedIn, isReviewAuthor } = require('../middleware')


router.post('/',isLoggedIn, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isLoggedIn, catchAsync(reviews.deleteReview))

module.exports = router;