var mongoose = require('mongoose');

var amenitiesComponentSchema = mongoose.Schema({
    amenities_bg: {
        type: [String],
        required: false
    },
    amenities_en: {
        type: [String],
        required: false
    },
    slug: {
        type: String,
        required: false
    }
});

var AmenitiesComponent = module.exports = mongoose.model('amenitiesComponent', amenitiesComponentSchema);