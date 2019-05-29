var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var async = require('async');

var router = express.Router();

var TableComponent = require('../models/TableComponent');
var Page = require('../models/Page');

//get admin pricing
router.get('/pricing', function (req, res) {

    let getPricingInfo = require('../db/get_pricing_page_info');

    getPricingInfo(req).then(function (resultObj) {
        res.render('admin/admin_pricing', resultObj);
    });
});

router.post('/pricing', function (req, res) {

    console.log(req.body);

    Page.findOne({ slug: 'pricing' }, function (err, page) {

        if (err) {
            console.log(err);
        }

        let languageLiteral = req.app.locals.language;
        let firstTableId = page.components.get('firstTable');
        let secondTableId = page.components.get('secondTable');
        TableComponent.findById(firstTableId, function (err, table) {

            if (err) {
                console.log(err);
            }

            let rows = req.body.firstTableRows;
            let cols = req.body.firstTableCols;
            let identifiersForUpdate = [];


            //get just indexes for values that were changed
            for (let i = 1; i < rows; i++) {
                for (let j = 0; j < cols; j++) {

                    if (table["cells_" + languageLiteral][i][j].trim() !== req.body["first" + "" + i + "" + j].toString().trim()) {

                        identifiersForUpdate.push(i + '.' + j);

                    }
                }
            }

            async.eachSeries(identifiersForUpdate, function (identifier, next) {

                //cells.1.0 - field cell which is array, then second row, first element
                let concatIdentifier = "cells_" + languageLiteral  + "." + identifier;
                
                TableComponent.update(
                    { "slug": "price_for_night_breakfast" },
                    { "$set": { [concatIdentifier]: req.body["first" + identifier.replace('.', '')].trim() } }, function (err, tableUpdated) {
                        if (err) console.log(err);
                        console.log(JSON.stringify(tableUpdated));

                        next();
                    });

            });


        });

        TableComponent.findById(secondTableId, function (err, table) {

            if (err) {
                console.log(err);
            }

            let rows = req.body.secondTableRows;
            let cols = req.body.secondTableCols;
            let identifiersForUpdate = [];


            //get just indexes for values that were changed
            for (let i = 1; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    console.log('===============================' + table["cells_" + languageLiteral][i][j]);
                    if (table["cells_" + languageLiteral][i][j].trim() !== req.body["second" + "" + i + "" + j].toString().trim()) {

                        identifiersForUpdate.push(i + '.' + j);

                    }
                }
            }

            async.eachSeries(identifiersForUpdate, function (identifier, next) {

                //cells.1.0 - field cell which is array, then second row, first element
                let concatIdentifier = "cells_ " + languageLiteral +"." + identifier;
                TableComponent.update(
                    { "slug": "extra_fav" },
                    { "$set": { [concatIdentifier]: req.body["second" + identifier.replace('.', '')].trim() } }, function (err, tableUpdated) {
                        if (err) console.log(err);
                        console.log(JSON.stringify(tableUpdated));

                        next();
                    });

            }, function (err) {
                res.redirect('/admin/pricing');
            });

        });

    });
});


module.exports = router;