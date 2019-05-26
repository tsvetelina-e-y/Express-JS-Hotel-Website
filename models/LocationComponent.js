var mongoose = require('mongoose');

var locationComponentSchema = mongoose.Schema({
    address_bg: {
        type: String,
        required: false
    },
    address_en: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    fax: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    }

});

var LocationComponent = module.exports = mongoose.model('locationComponents', locationComponentSchema);