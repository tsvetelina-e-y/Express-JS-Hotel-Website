var mongoose = require('mongoose');

var imageComponentSchema = mongoose.Schema({
    url: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    }
});

var ImageComponent = module.exports = mongoose.model('imageComponents', imageComponentSchema);

