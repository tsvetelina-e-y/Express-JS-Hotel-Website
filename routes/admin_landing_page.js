var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

var Page = require('../models/Page');
var TitleComponent = require('../models/TitleComponent');
var ParagraphComponent = require('../models/ParagraphComponent');
var AmenitiesComponent = require('../models/AmenitiesComponent');

//get landing page for edit
router.get('/landing-page', function (req, res) {

    let getLandingPageInfo = require('../db/get_landing_page_info');

    getLandingPageInfo().then(function (resultObj) {

        res.render('admin/admin_land_page', resultObj);
    });

});

//post landing page for edit
router.post('/landing-page', function (req, res) {

    console.log('===========' + req.body.amenities);
    let compTitle = req.body.compTitle;
    let compSubTitle = req.body.compSubTitle;

    let paraTitle1 = req.body.paraTitle1;
    let paraTitle2 = req.body.paraTitle2;
    let paraTitle3 = req.body.paraTitle3;
    let paragraph = req.body.paragraph;


    Page.findOne({ slug: 'landing-page' }, function (err, page) {
        if (err) {
            reject(err);
        }

        let titleId = page.components.get('headingTitle');
        let paragraphId = page.components.get('aboutUsParagraph');
        let amenitiesId = page.components.get('amenities');

        let findAndSaveTitlePromise = new Promise(function (resolve, reject) {
            TitleComponent.findById(titleId, function (err, resultTitle) {

                if (err) console.log(err);

                resultTitle.title = compTitle;
                resultTitle.subTitle = compSubTitle;

                resultTitle.save(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

        });

        let findAndSaveParapgraphPromise = new Promise(function (resolve, reject) {
            ParagraphComponent.findById(paragraphId, function (err, resultParagraph) {

                if (err) console.log(err);

                resultParagraph.title = paraTitle1;
                resultParagraph.subTitle = paraTitle2;
                resultParagraph.text = paragraph;

                resultParagraph.save(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

        });

        let findAndSaveAmenities = new Promise(function (resolve, reject) {

            AmenitiesComponent.findById(amenitiesId, function (err, resultAmenities) {
                if (err) {
                    reject(err);
                } else {

                    let newArrAmenities = req.body.amenities.split(';').filter(function (el) {
                        return el != '';
                    });

                    resultAmenities.amenities = newArrAmenities;
                    resultAmenities.save();
                    req.app.locals.amenities = newArrAmenities;
                    resolve();
                }

            });
        });

        Promise.all([findAndSaveTitlePromise
            , findAndSaveParapgraphPromise, findAndSaveAmenities]).then(function () {
                res.redirect('/admin/landing-page');
            });

    });

});


module.exports = router;
