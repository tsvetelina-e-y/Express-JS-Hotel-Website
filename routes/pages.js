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

//get landing page for edit
router.get('/admin/pages/landing-page', function (req, res) {

    var galleryDir = 'public/images/';
    var galleryImages = null;

    let resultObj = {};
    Page.findOne({ slug: 'landing-page' }, function (err, page) {

        let titleId = page.components.get('headingTitle');
        let paragraphId = page.components.get('aboutUsParagraph');
        let headerBgImgId = page.components.get('headerBgImage');

        let findTitlePromise = new Promise(function (resolve, reject) {
            TitleComponent.findById(titleId, function (err, resultTitle) {
                if (err) {
                    reject(err);
                } else {
                    resultObj['compTitle'] = resultTitle.title;
                    resultObj['compSubTitle'] = resultTitle.subTitle;

                    resolve();
                }
            });

        });

        //todo make things no se repeated!
        let findParapgraphPromise = new Promise(function (resolve, reject) {
            ParagraphComponent.findById(paragraphId, function (err, resultParagraph) {

                console.log(resultParagraph);
                if (err) {
                    reject(err);
                } else {

                    resultObj['paragraphTitle'] = resultParagraph.title;
                    resultObj['paragraphSubTitle'] = resultParagraph.subTitle;
                    resultObj['paragraphText'] = resultParagraph.text;

                    console.log(resultParagraph);
                    resolve();
                }

            });

        });

        let findHeaderImage = new Promise(function (resolve, reject) {

            ImageComponent.findById(headerBgImgId, function (err, image) {

                if(err) {
                    console.log(err);
                }
                var galleryDir = 'public/images/';
                //checking if image exists
                fs.readFile(galleryDir + image.name, function (err, files) {
                    if (err) {
                        reject(err);
                    } else {
                        resultObj['headerBgImg'] = image.name;
                        resolve();
                    }
                });
            });

        });

        Promise.all([findTitlePromise, findParapgraphPromise, findHeaderImage]).then(function () {
            res.render('admin/admin_land_page', resultObj);
        });
    });


});

//post landing page for edit
router.post('/admin/pages/landing-page', function (req, res) {


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

        Promise.all([findAndSaveTitlePromise, findAndSaveParapgraphPromise]).then(function () {
            res.redirect('/admin/pages/landing-page');
        });

    });

});

router.get('/', function (req, res) {


    res.render('admin/admin_land_page');
});

module.exports = router;