var TableComponent = require('../models/TableComponent');
var PageComponent = require('../models/Page');
var TitleComponent = require('../models/TitleComponent');
var ParagraphComponent = require('../models/ParagraphComponent');
var ImageComponent = require('../models/ImageComponent');
var fs = require('fs-extra');

module.exports = function (pageSlug) {


    return new Promise(function (resolve, reject) {

        PageComponent.findOne({ slug: pageSlug }, function (err, page) {


            if (err) reject(err);

console.log('----------------' + page);
            let titleId = page.components.get("title");
            let textId = page.components.get("text");
            let tableId = page.components.get("firstTable");
            let imgId = page.components.get("image");

            let resultObj = {};

            let findTitlePromise = new Promise(function (resolve, reject) {
                TitleComponent.findById(titleId, function (err, resultTitle) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['title'] = resultTitle.title;
                    resultObj['subTitle'] = resultTitle.subTitle;
                    resolve();

                });
            });

            let findParagraphPromise = new Promise(function (resolve, reject) {
                ParagraphComponent.findById(textId, function (err, resultParagraph) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['text'] = resultParagraph.text;
                    resolve();

                });
            });

            let findTablePromise = new Promise(function (resolve, reject) {
                TableComponent.findById(tableId, function (err, resultTable) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['firstTable'] = resultTable.cells;
                    resolve();

                });
            });

            let findImagePromise = new Promise(function (resolve, reject) {
                ImageComponent.findById(imgId, function (err, resultImage) {
                    console.log(resultImage);
                    if (err) {
                        console.log(err);
                    }
                    var galleryDir = 'public/images/';
                    //checking if image exists
                    console.log(galleryDir + resultImage['name']);
                    fs.readFile(galleryDir + resultImage.name, function (err, files) {
                        console.log(galleryDir + resultImage.name);
                        if (err) {
                            reject(err);
                        } else {
                            resultObj['image'] = resultImage.name || 'no-img';
                            resolve();
                        }
                    });
                });
            }).catch(function(err) {
                console.log("Image fas not found")
            });

            Promise.all([findTitlePromise, findParagraphPromise, findTablePromise, findImagePromise]).then(function () {
                resolve(resultObj);
            });

        });

    });

}