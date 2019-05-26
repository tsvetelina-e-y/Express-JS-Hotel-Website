var mongoose = require('mongoose');

var TitleComponent = require('./TitleComponent');

var pageSchema = mongoose.Schema({

    title_bg: {

        type: String,
        required: false

    },
    title_en: {

        type: String,
        required: false

    },
    slug: {
        type: String,
        required: false
    },

    components: {
        type: Map,
        required:false
    }
});



var Page = module.exports = mongoose.model('Page', pageSchema);

// var Page = new Page();
// var titleComponent1 = new TitleComponent();
// titleComponent1.title = 'Main Title';
// Page.title = 'title';
// Page.components = new Map();
// Page.components.set('landPageTitle', titleComponent1);
// Page.save(function(err) {
//     console.log('saved')
// });