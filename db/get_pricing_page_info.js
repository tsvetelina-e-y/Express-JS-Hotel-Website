var TableComponent = require('../models/TableComponent');
var Page = require('../models/Page');

module.exports = function () {

    return new Promise(function (resolve, reject) {

        Page.findOne({ slug: 'pricing' }, function (err, page) {

            if (err) {
                reject(err);
            }

            let resultObj = {};
            let firstTableId = page.components.get('firstTable');
            let secondTableId = page.components.get('secondTable');

            let findFirstTablePromise = new Promise(function (resolve, reject) {
                TableComponent.findById(firstTableId, function (err, table) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['firstTable'] = table.cells;
                    resultObj['firstTableTitle'] = 'Първа таблица';
                    resolve();

                });
            });

            let findSecondTablePromise = new Promise(function (resolve, reject) {
                TableComponent.findById(secondTableId, function (err, table) {

                    if (err) {
                        reject(err);
                    }

                    resultObj['secondTable'] = table.cells;
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

