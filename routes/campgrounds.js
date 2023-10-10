const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground')
const { isLoggedIn, isAuthor } = require('../middleware');
const multer  = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image') , catchAsync(campgrounds.createCampground))
//router.post('/', upload.array('image'), (req, res) => {
//    console.log(req.body, req.files)
//    res.send('It Worked')
//})

router.get('/:id', catchAsync(campgrounds.getCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, catchAsync(campgrounds.deleteCampground))

module.exports = router;