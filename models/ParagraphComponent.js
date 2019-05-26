var mongoose = require('mongoose');

var paragraphComponentSchema = mongoose.Schema({
    title_bg: {
        type: String,
        required: false
    },
    
    title_en: {
        type: String,
        required: false
    },

    subTitle_bg: {
        type: String,
        required: false
    },
    subTitle_en: {
        type: String,
        required: false
    },

    smallTitle_bg: {
        type: String,
        required: false
    },

    smallTitle_en: {
        type: String,
        required: false
    },

    text_bg: {
        type: String,
        required: false
    },

    text_en: {
        type: String,
        required: false
    },

    slug: {
        type: String,
        required: false
    }

});

var paragraphComponent = module.exports = mongoose.model('ParagraphComponents', paragraphComponentSchema);
