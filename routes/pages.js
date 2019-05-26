var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var router = express.Router();

var LocationComponent = require('../models/LocationComponent');
var ParagraphComponent = require('../models/ParagraphComponent');
var TitleComponent = require('../models/TitleComponent');
var ImageComponent = require('../models/ImageComponent');
var Page = require('../models/Page');

router.get('/landing-page', function (req, res) {

    Page.findOne({ slug: 'landing-page' }, function (err, page) {


        let headerTitleId = page.components.get('headingTitle');
        let resultObj = {};

        TitleComponent.findById(headerTitleId, function (err, resultTitle) {

            if (err) {
                console.log(err);
            }

            resultObj['mainTitle'] = resultTitle.title;
            resultObj['subTitle'] = resultTitle.subTitle;
            res.render('land_page', resultObj);
        })

        //landing-page

    });

});


router.get('/spa', function(req, res){

    res.render('spa');


});




router.get('/', function (req, res) {


    res.render('admin/admin_land_page');
});

module.exports = router;