var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');

var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', { useNewUrlParser: true });
var AmenitiesComponent = require('./models/AmenitiesComponent');

//Init app
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


//Express file uplaod middleware

app.use(fileUpload());

//body parser middleware


//Get all amenities to pass to header.ejs

AmenitiesComponent.findOne({ slug: 'amenities' }, function (err, resultObj) {
    if (err) {
        console.log(err);
    } else {

        app.locals.language = 'bg';
        app.locals.amenities = resultObj['amenities_' + app.locals.language];

    }
});


app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json

app.use(bodyParser.json());


// app.get('/', function(req, res) {
//     res.send('working');
// })

//Start the server

var port = 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});

app.use('/', router.get('/language', function (req, res) {
    req.app.locals.language = req.app.locals.language == 'bg' ? 'en' : 'bg';

    //todo this is written .. twixe
    AmenitiesComponent.findOne({ slug: 'amenities' }, function (err, resultObj) {
        if (err) {
            console.log(err);
        } else {
    
            req.app.locals.amenities = resultObj['amenities_' + req.app.locals.language];
            res.redirect('back');
        }
    });

    
}));


//set routes

var pagesR = require('./routes/pagesR');
var adminSpa = require('./routes/admin_spa');
var adminLangindPagge = require('./routes/admin_landing_page');
var adminSendMessage = require('./routes/admin_contact');
var adminAboutUs = require('./routes/admin_about_us');
var adminPricing = require('./routes/admin_pricing');
var adminOffert = require('./routes/admin_offert');
var adminImages = require('./routes/admin_images');
// var pages = require('./routes/pages.js');

app.use('/', pagesR);
app.use('/admin', adminLangindPagge);
app.use('/admin', adminAboutUs);
app.use('/admin', adminSpa);
app.use('/admin', adminPricing);
app.use('/admin', adminOffert);
app.use('/admin', adminImages);
app.use('/admin', adminSendMessage);
