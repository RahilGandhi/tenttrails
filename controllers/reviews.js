const Reviews = require('../models/reviews');
const Campground = require('../models/campground');

module.exports.createReview = async ( req, res ) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Reviews(req.body.review);
    review.author = req.user._id;
    campground.review.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { review : reviewId }});
    await Reviews.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}