var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

var Page = require('../models/Page');
var ParagraphComponent = require('../models/ParagraphComponent');

router.get('/about-us', function (req, res) {

    let getAboutUsPageInfo = require('../db/get_about_us_info');

    getAboutUsPageInfo().then(function (resultObj) {
        res.render('admin/admin_about_us', resultObj);
    });

});

router.post('/about-us', function (req, res) {

    Page.findOne({ slug: 'about_us' }, function (err, page) {

        if (err) {
            reject(err);
        } else {
            let textId = page.components.get('text');

            let findParapgraphAndSavePromise = new Promise(function (resolve, reject) {
                ParagraphComponent.findById(textId, function (err, resultParagraph) {

                    console.log('------------' + resultParagraph);
                    if (err) {
                        reject(err);
                    } else {

                        resultParagraph['title'] = req.body.title;
                        resultParagraph['subTitle'] = req.body.subTitle;
                        resultParagraph['text'] = req.body.text;

                        resultParagraph.save();
                        resolve();
                    }

                });

            });


            Promise.all([findParapgraphAndSavePromise]).then(function () {
                res.redirect('/admin/about-us');
            });

        }

    });


});


module.exports = router;