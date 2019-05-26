var mongoose = require('mongoose');



var titleComponentSchema = mongoose.Schema({

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
    slug: {
        type: String,
        required: false
    }
});



var TitleComponent = module.exports = mongoose.model('TitleComponents', titleComponentSchema);