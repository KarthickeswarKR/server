/**
 * Created by Karthick Eswar K R on 18/10/2016.
 */
var express = require('express');
var mailer = require('express-mailer');
var resHandler = require("../../common/res-handler");
var config1 = require('../../config/mail-config');
var currentMailerOptions = config1.mailer;
var config = require('../../config/config');
var log = require('log4js').getLogger("mailservice");

var app = express();
mailer.extend(app, currentMailerOptions);

// Views
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

exports.sendChangePasswordURL = function(req,res,userEmail,data) {
    console.log("Mail Service Started...");
    log.debug("in forget password mail");
    var baseURL =config.get('domain:baseURL');
    app.locals.url = baseURL;
    app.mailer.send('email', {
            to: userEmail,
            subject: 'VG - Password Change Request'
        },
        function (err,mailRes) {
            if (err) {
                console.log('Sending Mail Failed!');
                console.log(err);
                res.send(err);
                return;
            };
            console.log("Mail Sent"+mailRes);
            {
log.info("forget password response send successfully");
resHandler.success(res,"AddUser",req.originalUrl,data);
}
        });
};
exports.verifyemail = function(req,res,userEmail,data) {
    console.log("Mail Service Started...");
    var baseURL = process.env.EMAILURL ||config.get('domain:emailURL');
    app.locals.url = "orderplaced by"+data.userId;
    app.mailer.send('email', {
            to: userEmail,
            subject: 'VG - Password Change Request'
        },
        function (err,mailRes) {
            if (err) {
                console.log('Sending Mail Failed!');
                console.log(err);
                res.send(err);
                return;
            };
            console.log("Mail Sent"+mailRes);
            {
resHandler.success(res,"placeorder",req.originalUrl,data);
}
        });
};
