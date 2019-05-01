var mongoose = require('mongoose');

var tableComponentSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    cells: {
        type: [[]],
        required: false
    },
    test: {},
    required: false,
    notes: [String],
    required: false,
    slug: {
        type: String,
        required: false
    }

});

var tableComponent = module.exports = mongoose.model('TableComponents', tableComponentSchema);