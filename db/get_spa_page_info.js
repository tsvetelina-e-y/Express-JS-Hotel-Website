var ParagraphComponent = require('../models/ParagraphComponent');
var Page = require('../models/Page');

module.exports = function () {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'spa' }, function (err, page) {

            if (err) {
                reject(err);
            }

            let paragraphId = page.components.get('contentParagraph');
            let resultObj = {};

            let findParagraphInfoPromise = new Promise(function (resolve, reject) {

                ParagraphComponent.findById(paragraphId, function (err, resultParagraph) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['title'] = resultParagraph.title;
                    resultObj['content'] = resultParagraph.text;

                    resolve();

                });
            });


            Promise.all([findParagraphInfoPromise]).then(function () {
                resolve(resultObj);
            });

        });

    });

}