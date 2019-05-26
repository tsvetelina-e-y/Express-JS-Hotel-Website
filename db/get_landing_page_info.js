var express = require('express');
var mkdirp = require('mkdirp');
var fs = require('fs-extra');

var ParagraphComponent = require('../models/ParagraphComponent');
var TitleComponent = require('../models/TitleComponent');
var ImageComponent = require('../models/ImageComponent');
var LocationComponent = require('../models/LocationComponent');
var AmenitiesComponent = require('../models/AmenitiesComponent');
var Page = require('../models/Page');


module.exports = function (req) {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'landing-page' }, function (err, page) {

            if (err) {
                reject(err);
            } else {

                let resultObj = {};
               
                let languageLiteral = req.app.locals.language == 'bg' ? 'bg' : 'en';
                let titleId = page.components.get('headingTitle');
                let paragraphId = page.components.get('aboutUsParagraph');
                let headerBgImgId = page.components.get('headerBgImage');
                let locationId = page.components.get('location');
                let amenitiesId = page.components.get('amenities');


                let findTitlePromise = new Promise(function (resolve, reject) {
                    TitleComponent.findById(titleId, function (err, resultTitle) {
                        if (err) {
                            reject(err);
                        } else {
                            resultObj['compTitle'] = resultTitle['title_' + languageLiteral];
                            resultObj['compSubTitle'] = resultTitle['subTitle_' + languageLiteral];

                            resolve();
                        }
                    });

                });

                let findLocationPromise = new Promise(function (resolve, reject) {
                    LocationComponent.findById(locationId, function (err, resultLocation) {


                        if (err) {
                            reject(err);
                        } else {

                            resultObj['address'] = resultLocation['address_' + languageLiteral];
                            resultObj['phone'] = resultLocation.phone;
                            resultObj['email'] = resultLocation.email;

                            resolve();
                        }

                    });

                });


                let findParapgraphPromise = new Promise(function (resolve, reject) {
                    ParagraphComponent.findById(paragraphId, function (err, resultParagraph) {

                        if (err) {
                            reject(err);
                        } else {

                            resultObj['paragraphTitle'] = resultParagraph['title_' + languageLiteral];
                            resultObj['paragraphSubTitle'] = resultParagraph['subTitle_' + languageLiteral];
                            resultObj['paragraphText'] = resultParagraph['text_' + languageLiteral];

                            console.log(resultParagraph);
                            resolve();
                        }

                    });

                });

                let findHeaderImage = new Promise(function (resolve, reject) {

                    ImageComponent.findById(headerBgImgId, function (err, image) {

                        if (err) {
                            console.log(err);
                        }
                        var galleryDir = 'public/images/';
                        //checking if image exists
                        fs.readFile(galleryDir + image.url, function (err, files) {
                            if (err) {
                                reject(err);
                            } else {
                                resultObj['headerBgImg'] = image.url;
                                resolve();
                            }
                        });
                    });

                });

                // let findAmenities = new Promise(function (resolve, reject) {
                //     AmenitiesComponent.findById(amenitiesId, function (err, result) {
                //         if (err) {
                //             reject(err);
                //         } else {

                //             resultObj['amenities'] = result.amenities;
                //             resolve();
                //         }
                //     });
                // });

                Promise.all([findTitlePromise, findLocationPromise
                    , findParapgraphPromise, findHeaderImage]).then(function () {
                        resolve(resultObj);
                    });

            }

        });

    });

};



// module.exports = getInfoObj;