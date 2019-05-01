var mongoose = require('mongoose');

var paragraphComponentSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    subTitle: {
        type: String,
        required:false
    },

    smallTitle: {
        type: String,
        required: false
    },
    
    text: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    }

});

var paragraphComponent = module.exports = mongoose.model('ParagraphComponents', paragraphComponentSchema);
