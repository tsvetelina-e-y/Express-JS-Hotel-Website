var ParagraphComponent = require('../models/ParagraphComponent');
var Page = require('../models/Page');

module.exports = function (req) {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'spa' }, function (err, page) {

            if (err) {
                reject(err);
            }

            let languageLiteral = req.app.locals.language;
            let paragraphId = page.components.get('contentParagraph');
            let resultObj = {};

            let findParagraphInfoPromise = new Promise(function (resolve, reject) {

                ParagraphComponent.findById(paragraphId, function (err, resultParagraph) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['title'] = resultParagraph['title_' + languageLiteral];
                    resultObj['content'] = resultParagraph['text_'+ languageLiteral];

                    console.log('===========================' +JSON.stringify(resultObj));

                    resolve();

                });
            });


            Promise.all([findParagraphInfoPromise]).then(function () {
                resolve(resultObj);
            });

        });

    });

}