const mongoose = require('mongoose');
const Reviews = require('./reviews');
const Schema = mongoose.Schema;

const opts = { toJSON : { virtuals : true }}
const CampGroundSchema = new Schema({
    title: String,
    images: [
        {
            url : String,
            fileName: String
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates : {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampGroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href='/campgrounds/${this._id}'>${this.title}</a>
    <p>${this.location}</p>`
})

CampGroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Reviews.deleteMany({
            _id: {
                $in: doc.review
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampGroundSchema);

