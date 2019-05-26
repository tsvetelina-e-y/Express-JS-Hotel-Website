var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var router = express.Router();
var getSpaPageInfo = require('../db/get_spa_page_info');
var Page = require('../models/Page');
var ParagraphComponent = require('../models/ParagraphComponent');

//get public spa
router.get('/spa', function (req, res) {

    getSpaPageInfo(req).then(function (resultObj) {
        res.render('admin/admin_spa', resultObj);
    });

});

//get public spa
router.post('/spa', function (req, res) {

    let newInfo = req.body.content;

    let languageLiteral = req.app.locals.language;

    Page.findOne({ slug: 'spa' }, function (err, page) {
        if (err) {
            console.log(err);
        } else {
            let pagePragraphId = page.components.get('contentParagraph');

            ParagraphComponent.findById(pagePragraphId, function (err, resultParagraph) {

                if (err) {
                    console.log(err);
                }

                resultParagraph['text_' + languageLiteral] = newInfo;
                resultParagraph.save();
                res.redirect('/admin/spa');

            });
        }
    });

});

module.exports = router;
