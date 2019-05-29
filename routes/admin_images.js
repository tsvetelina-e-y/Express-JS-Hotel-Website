var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

router.get('/gallery', function (req, res) {

    fs.readdir('public/images/gallery/', function (err, files) {
        if (err) {
            reject(err);
        } else {
            res.render('admin/admin_gallery', { images: files });
        }
    });

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

//get delete image

router.get('/delete-image/:image', function (req, res) {

    var originalImage = 'public/images/gallery/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {

            // req.flash('success', 'Картината е променена!');
            res.redirect('back');
        }

    });

});

router.post('/add-image', function (req, res) {

    let imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";

    fs.readdir('public/images/gallery/', function (err, files) {
        if (err) {
            console.log(err)
        } else {

            let productImage = req.files.image;
            let path = 'public/images/gallery/' + req.files.image.name;

            productImage.mv(path, function (err) {
                return console.log(err);
            });

            res.redirect('back');

        }
    });

});

module.exports = router;