var express = require('express');
var fs = require('fs-extra');
var router = express.Router();

let nodeMailer = require('nodemailer');


router.post('/message', function (req, res) {

    let transporter = nodeMailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: '*****************',
            pass: '********'
        }
    });
    let mailOptions = {

        to: 'kambanka.dryn@gmail.com',
        subject: req.body.firstName,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    // res.writeHead(301, { Location: 'index.html' });
    res.redirect('back');

});


module.exports = router;