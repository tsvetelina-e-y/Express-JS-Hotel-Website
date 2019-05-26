var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var ParagraphComponent = require('../models/ParagraphComponent');
var Page = require('../models/Page');

module.exports = function (req) {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'about_us' }, function (err, page) {

            if (err) {
                reject(err);
            } else {

                let resultObj = {};
                let textId = page.components.get('text');

                let findParapgraphPromise = new Promise(function (resolve, reject) {
                    ParagraphComponent.findById(textId, function (err, resultParagraph) {

                        if (err) {
                            reject(err);
                        } else {

                            let languageLiteral = req.app.locals.language == 'bg' ? 'bg' : 'en';
                            resultObj['title'] = resultParagraph['title_' + languageLiteral];
                            resultObj['subTitle'] = resultParagraph['subTitle_' + languageLiteral];
                            resultObj['text'] = resultParagraph['text_' + languageLiteral];
                            resolve();
                        }

                    });

                });


                Promise.all([findParapgraphPromise]).then(function () {
                    resolve(resultObj);
                });

            }

        });

    });

};