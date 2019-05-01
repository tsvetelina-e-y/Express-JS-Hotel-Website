var mongoose = require('mongoose');



var titleComponentSchema = mongoose.Schema({

    title: {

        type: String,
        required: false

    },
    subTitle: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    },
    titleEN: {
        type: String,
        required: false
    },
    subTitleEN: {
        type: String,
        required: false
    }
});



var TitleComponent = module.exports = mongoose.model('TitleComponents', titleComponentSchema);