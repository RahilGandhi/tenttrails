const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');

//Connect to DB
mongoose.connect('mongodb+srv://rahil10x:rahil10x@cluster0.umpp81b.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database Connected")
})

const sample = array => array[Math.floor(Math.random() * 18)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 31; i++){
        const random30 = Math.floor(Math.random() * 30);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65032e90562f37b206dfbd98',
            location: `${cities[random30].city}, ${cities[random30].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolores sapiente, officia incidunt saepe hic! Dicta minima aperiam eligendi, sequi autem assumenda iure velit laborum, nam itaque impedit fuga explicabo.",
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random30].lng, cities[random30].lat]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dq2vluzii/image/upload/v1696503338/TentTrails/jx2jkxqb3j3umq2tgo7y.avif',
                    fileName: 'TentTrails/jx2jkxqb3j3umq2tgo7y',
                  },
                  {
                    url: 'https://res.cloudinary.com/dq2vluzii/image/upload/v1696503338/TentTrails/gu1bgozr5nbztnkyjmjs.avif',
                    fileName: 'TentTrails/gu1bgozr5nbztnkyjmjs',
                  }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

