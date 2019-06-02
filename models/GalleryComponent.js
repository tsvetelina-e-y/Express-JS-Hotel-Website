var mongoose = require('mongoose');

var gallerySchema = mongoose.Schema({
    images: {
        type: [String],
        required: false
    },
    slug: {
        type: String,
        required: false
    }
});

var GalleryComponent = module.exports = mongoose.model('galleryComponent', gallerySchema);