var express = require('express');
var fs = require('fs-extra');

var router = express.Router();

//get public landing page
router.get('/', function (req, res) {

  var getInfoObj = require('../db/get_landing_page_info.js');
  getInfoObj(req).then(function (resultObj) {

    res.render('land_page', resultObj);

  });

});

router.get('/base', function (req, res) {

  var getInfoObj = require('../db/get_about_us_info');
  getInfoObj(req).then(function (resultObj) {
    res.render('base', resultObj);
  });

});

//get public pricing
router.get('/pricing', function (req, res) {

  var getInfoObj = require('../db/get_pricing_page_info');
  getInfoObj(req).then(function (resultObj) {
    res.render('pricing', resultObj);
  });

});

router.get('/spa', function (req, res) {

  var getInfoObj = require('../db/get_spa_page_info');
  getInfoObj(req).then(function (resultObj) {
    res.render('spa', resultObj);
  });

});

router.get('/contact', function (req, res) {

  res.render('contact');

});

router.get('/gallery', function (req, res) {

  fs.readdir('public/images/gallery', function (err, images) {
    if (err) {
      reject(err);
    } else {

      res.render('gallery', { images: images });

    }
  });

});

//get public spa
router.get('/offerts/:slug', function (req, res) {

  let getOffertPageInfo = require('../db/get_offert_page_info');

  getOffertPageInfo(req, req.params.slug).then(function (resultObj) {
    res.render('offert', resultObj);
  });

});

// router.get('*', function(req, res) {
//   res.send('err');
// });


module.exports = router;