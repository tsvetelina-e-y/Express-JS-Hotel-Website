var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hotel', { useNewUrlParser: true });


//Init app
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware



app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json

app.use(bodyParser.json());


// app.get('/', function(req, res) {
//     res.send('working');
// })

//Start the server

var port = 3000;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});


//set routes

var pagesR = require('./routes/pagesR');
var adminSpa = require('./routes/admin_spa');
var adminPricing = require('./routes/admin_pricing');
var adminOffert = require('./routes/admin_offert');
// var pages = require('./routes/pages.js');

app.use('/pages', pagesR);
app.use('/admin', adminSpa);
app.use('/admin', adminPricing);
app.use('/admin', adminOffert);