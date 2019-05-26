var TableComponent = require('../models/TableComponent');
var Page = require('../models/Page');

module.exports = function (req) {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'pricing' }, function (err, page) {

            if (err) {
                reject(err);
            }

            let languageLiteral = req.app.locals.language;
            let resultObj = {};
            let firstTableId = page.components.get('firstTable');
            let secondTableId = page.components.get('secondTable');

            let findFirstTablePromise = new Promise(function (resolve, reject) {
                TableComponent.findById(firstTableId, function (err, table) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['firstTable'] = table['cells_' + languageLiteral];
                    resultObj['firstTableTitle'] = languageLiteral == 'bg' ? 'Първа таблица' : 'First table';
                    resolve();

                });
            });

            let findSecondTablePromise = new Promise(function (resolve, reject) {
                TableComponent.findById(secondTableId, function (err, table) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['secondTable'] = table['cells_' + languageLiteral];
                    resultObj['secondTableTitle'] = ' Втора таблица';
                    resolve();

                });
            });

            Promise.all([findFirstTablePromise, findSecondTablePromise]).then(function () {
                resolve(resultObj);
            });

        });

    });

}

