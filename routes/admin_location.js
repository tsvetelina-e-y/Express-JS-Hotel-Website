var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

var LocationComponent = require('../models/LocationComponent');

router.get('/location', function(req, res) {

    let languageLiteral = req.app.locals.language;

    LocationComponent.findOne({slug: 'location'}, function(err, location){

        let resultObj = {};

        resultObj['address'] = location['address_' + languageLiteral];
        resultObj['phone'] = location['phone'];
        resultObj['email'] = location['email'];

        res.render('admin/admin_location', resultObj);

    });

});

router.post('/location', function(req, res) {

    let languageLiteral = req.app.locals.language;

    LocationComponent.findOne({slug: 'location'}, function(err, location){

        location['address_' + languageLiteral] = req.body.address;
        location['phone'] = req.body.phone;
        location['email'] = req.body.email;

        location.save();
        res.redirect('back');

    });

});


module.exports = router;