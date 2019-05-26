var mongoose = require('mongoose');

var tableComponentSchema = mongoose.Schema({
    title_bg: {
        type: String,
        required: false
    },
    title_en: {
        type: String,
        required: false
    },
    cells_bg: {
        type: [[]],
        required: false
    },
    cells_en: {
        type: [[]],
        required: false
    },
    
    slug: {
        type: String,
        required: false
    }

});

var tableComponent = module.exports = mongoose.model('TableComponents', tableComponentSchema);