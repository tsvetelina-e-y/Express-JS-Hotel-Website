var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

//tuka kato e get shte se polzwa ajax za da se rendyrnat
router.get('/images', function (req, res) {

    fs.readdir('public/images/', function (err, files) {
        if (err) {
            reject(err);
        } else {
            console.log(files);
            res.send(files);
        }
    });

});

module.exports = router;