var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

router.get('/offerts/:slug', function (req, res) {

    let getOffertPageInfo = require('../db/get_offert_page_info');

    getOffertPageInfo(req.params.slug).then(function(resultObj) {
        res.render('admin/admin_offert', resultObj);
    });

});

module.exports = router;

