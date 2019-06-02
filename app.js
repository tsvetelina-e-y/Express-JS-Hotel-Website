var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var validator = require('express-validator');

var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var flash = require('connect-flash');

var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', { useNewUrlParser: true });
var AmenitiesComponent = require('./models/AmenitiesComponent');
var LocationComponent = require('./models/LocationComponent');

//Init app
var app = express();

require('./config/passport');

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(validator());

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


LocationComponent.findOne({ slug: 'location' }, function (err, resultObj) {
    if (err) {
        console.log(err);
    } else {
        app.locals.location = resultObj;
    }
});


app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json

app.use(bodyParser.json());

app.locals.errors = null;


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

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});


var pagesR = require('./routes/pagesR');
var adminSpa = require('./routes/admin_spa');
var adminLangindPagge = require('./routes/admin_landing_page');
var adminSendMessage = require('./routes/admin_contact');
var adminLocation = require('./routes/admin_location');
var adminAboutUs = require('./routes/admin_about_us');
var adminPricing = require('./routes/admin_pricing');
var adminOffert = require('./routes/admin_offert');
var adminImages = require('./routes/admin_images');
var adminUser = require('./routes/admin_user');
// var pages = require('./routes/pages.js');

app.use('/', pagesR);
app.use('/admin', adminLangindPagge);
app.use('/admin', adminAboutUs);
app.use('/admin', adminSpa);
app.use('/admin', adminPricing);
app.use('/admin', adminOffert);
app.use('/admin', adminImages);
app.use('/admin', adminSendMessage);
app.use('/admin', adminLocation);
app.use('/admin', adminUser);
