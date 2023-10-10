const Campground = require('./models/campground');
const Reviews = require('./models/reviews');

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user)
    if(!req.isAuthenticated()){
        console.log("User not logged in kindly login !");
        return res.redirect('/login');
    }
    next()
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(req.params.id);
    if(!campground.author.equals(req.user._id)){
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Reviews.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}