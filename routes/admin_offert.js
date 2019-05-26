var express = require('express');
var fs = require('fs-extra');
var router = express.Router();
var async = require('async');

var TitleComponent = require('../models/TitleComponent');
var ParagraphComponent = require('../models/ParagraphComponent');
var TableComponent = require('../models/TableComponent');
var ImageComponent = require('../models/ImageComponent');

var Page = require('../models/Page');

router.get('/offerts/:slug', function (req, res) {

    let getOffertPageInfo = require('../db/get_offert_page_info');

    getOffertPageInfo(req.params.slug).then(function (resultObj) {
        res.render('admin/admin_offert', resultObj);
    });

});

router.post('/offerts/:slug', function (req, res) {

    Page.findOne({ slug: req.params.slug }, function (err, page) {

        //todo open robomongo and set the component name
        let titleId = page.components.get('title');
        let tableId = page.components.get('firstTable');
        let textId = page.components.get('text');
        // let imgId = page.components.get('');

        let findAndSaveTitlePromise = new Promise(function (resolve, reject) {

            TitleComponent.findById(titleId, function (err, resultTitle) {

                if (err) {
                    reject(err);
                }

                resultTitle.title = req.body.title;
                resultTitle.subTitle = req.body.title;

                resultTitle.save();
                resolve();

            });


        }).catch(function (err) {
            console.log(err);
        });

        let findTableAndSavePromise = new Promise(function (resolve, reject) {

            TableComponent.findById(tableId, function (err, resultTable) {

                if (err) {
                    reject(err);
                }

                let rows = resultTable.cells.length;
                let cols = resultTable.cells[0].length;

                let identifiersForUpdate = [];


                //get just indexes for values that were changed
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {

                        if (resultTable.cells[i][j].trim() !== req.body[i + "" + j].toString().trim()) {

                            identifiersForUpdate.push(i + '.' + j);

                        }
                    }
                }

                async.eachSeries(identifiersForUpdate, function (identifier, next) {

                    //cells.1.0 - field cell which is array, then second row, first element
                    let concatIdentifier = "cells." + identifier;
                    TableComponent.update(
                        { "slug": "easter_offert" },
                        { "$set": { [concatIdentifier]: req.body[identifier.replace('.', '')].trim() } }, function (err, tableUpdated) {
                            if (err) console.log(err);
                            console.log(JSON.stringify(tableUpdated));
                           
                            next();
                        });

                }, function (err) {
                    res.redirect('/admin/offerts/' + req.params.slug);
                });

            });

        }).catch(function (err) {
            console.log(err);
        });

        let findTextAndSavePromise = new Promise(function (resolve, reject) {

            ParagraphComponent.findById(textId, function (err, resultText) {
                if (err) {
                    console.log(err);
                }

                resultText.text = req.body.content;
                resultText.save();
                resolve();

            });

        }).catch(function (err) {
            console.log(err);
        });


        Promise.all([findAndSaveTitlePromise, findTableAndSavePromise, findTextAndSavePromise]).then(function () {
            res.redirect('/admin/offerts/' + req.params.slug);
        });

    });

});

module.exports = router;

