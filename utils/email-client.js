var nodemailer = require('nodemailer');
var express = require('express');
var svrConf = require('./server-config');

var emailClient = {};

var transporter = nodemailer.createTransport({
    service: svrConf.email.service,
    auth: {
        user: svrConf.email.user,
        pass: svrConf.email.password
    }
}, {
    // default values for sendMail method
    from: svrConf.email.user,
    headers: {

    }
});


emailClient.send = function(to, event_title, event_id) {
    var elink = svrConf.serverUrl + '/events/' + event_id;

    var mailOptions = {
        from: svrConf.email.user,
        to: to,
        subject: 'You have reserved a spot in this event!',
        text: '',   // plaintext body
        html: '<h5>Congratulations!</h5> <p>You have successfully reserved a spot in <a href=' + elink + '>' + event_title + '</a>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            throw err;
        }
        console.log('Message sent: ' + info.response);
    });
};

module.exports = emailClient;