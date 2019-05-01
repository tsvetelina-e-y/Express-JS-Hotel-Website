var express = require('express');

var router = express.Router();

//get public landing page
router.get('/landing-page', function (req, res) {

  var getInfoObj = require('../db/get_landing_page_info.js');
  getInfoObj().then(function (resultObj) {

    res.render('land_page', resultObj);

  });

});

//get public pricing
router.get('/pricing', function (req, res) {

    res.render('pricing');

});



//ТОДО get user spa........

//get public spa
router.get('admin/spa', function (req, res) {

  // var getInfoObj = require('../db/get_landing_page_info.js');
  getInfoObj().then(function (resultObj) {

    res.render('land_page', resultObj);

  });

});




module.exports = router;