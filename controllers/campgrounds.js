const Campground = require('../models/campground')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.MAPBOX_TOKEN
const geoCoder = mbxGeocoding({ accessToken: mapboxToken });

module.exports.index = async (req,res) => {
    const campgrounds  = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req,res) => {
    res.render('campgrounds/new')
}

module.exports.createCampground = async (req,res, next) => {
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data')
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    
    req.files.map((f) => ({ url: f.path, fileName: f.filename }))
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry
    campground.images = req.files.map((f) => ({ url: f.path, fileName: f.filename }))
    campground.author = req.user._id;
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`) 
}

module.exports.getCampground = async (req,res) => {
    const campground = await Campground.findById(req.params.id).populate({path: 'review', populate: { path: 'author'}}).populate('author')
    res.render('campgrounds/show', {campground});
}

module.exports.renderEditForm = async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.updateCampground = async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
}   

module.exports.deleteCampground = async (req,res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')    
}