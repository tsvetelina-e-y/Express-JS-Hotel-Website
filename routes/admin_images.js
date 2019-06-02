var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

var GalleryComponent = require('../models/GalleryComponent');

router.get('/gallery', function (req, res) {

    GalleryComponent.findOne({slug: 'gallery'}, function(err, gallery){
        if(err) {
            consoel.log(err);
        }

        // fs.readdir('public/images/gallery/', function (err, files) {
        //     if (err) {
        //         reject(err);
        //     } else {
        //         res.render('admin/admin_gallery', { images: files });
        //     }
        // });

        res.render('admin/admin_gallery', { images: gallery.images });

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

    var originalImage = 'public/images/' + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err);
        } else {

            GalleryComponent.findOne({slug: 'gallery'}, function(err, gallery){
                if(err) {
                    consoel.log(err);
                }
        
                if(gallery.images.includes(req.params.image)){
                    let index = gallery.images.indexOf(req.params.image);
                    gallery.images.splice(index, 1);
                    gallery.save();
                }
        
            }); 

            req.flash('success', 'Картината е изтрита!');
            res.redirect('back');
        }

    });

});

router.post('/add-image', function (req, res) {

    let imageFile = typeof req.files.image !== 'undefined' ? req.files.image.name : "";

    fs.readdir('public/images/', function (err, files) {
        if (err) {
            console.log(err)
        } else {

            let productImage = req.files.image;
            let path = 'public/images/' + req.files.image.name;

            productImage.mv(path, function (err) {
                return console.log(err);
            });

            GalleryComponent.findOne({slug: 'gallery'}, function(err, gallery){
                if(err) {
                    consoel.log(err);
                }
        
               gallery.images.push(req.files.image.name);
               gallery.save();
        
            }); 

            res.redirect('back');

        }
    });

});

module.exports = router;