var mongoose = require('mongoose');

var amenitiesComponentSchema = mongoose.Schema({
    amenities: {
        type: [String],
        required: false
    },
    slug: {
        type: String,
        required: false
    }
});

var AmenitiesComponent = module.exports = mongoose.model('amenitiesComponent', amenitiesComponentSchema);