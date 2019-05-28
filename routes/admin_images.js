var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

router.get('/gallery', function (req, res) {

   res.render('admin/admin_gallery');

});

//tuka kato e get shte se polzwa ajax za da se rendyrnat
router.get('/images', function (req, res) {

    fs.readdir('public/images/', function (err, files) {
        if (err) {
            reject(err);
        } else {

            res.send(files);
        }
    });

});

router.post('/add-image', function (req, res) {

    console.log(req.files);
    let imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";

    fs.readdir('public/images/', function (err, files) {
        if (err) {
            reject(err);
        } else {

            let productImage = req.files.image;
            let path = 'public/images/' + req.files.image.name;

            productImage.mv(path, function (err) {
                return console.log(err);
            });

            res.redirect('back');

        }
    });

});

module.exports = router;